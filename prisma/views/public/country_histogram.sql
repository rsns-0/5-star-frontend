WITH histogram AS (
  SELECT
    v.id,
    count(*) AS frequency,
    v.name
  FROM
    country_entries v
  GROUP BY
    v.id,
    v.name
  ORDER BY
    v.id,
    (count(*)) DESC
),
histogram_stats AS (
  SELECT
    h.id,
    jsonb_agg(
      ROW(h.name, (h.frequency) :: integer) :: histogram_item
    ) AS entries,
    sum(h.frequency) AS sample_size,
    mf.cluster_max,
    avg(h.frequency) AS cluster_avg,
    stddev(h.frequency) AS cluster_stddev,
    min(h.frequency) AS cluster_min,
    count(h.frequency) AS cluster_count,
    (mf.cluster_max - min(h.frequency)) AS cluster_range,
    count(h.frequency) FILTER (
      WHERE
        (h.frequency = mf.cluster_max)
    ) AS mode_count,
    (
      (mf.cluster_max) :: numeric / sum(h.frequency) FILTER (
        WHERE
          (
            (h.frequency) :: numeric >= ((mf.cluster_max) :: numeric * 0.5)
          )
      )
    ) AS mode_score
  FROM
    (
      histogram h
      JOIN (
        SELECT
          fd_1.id,
          max(fd_1.frequency) AS cluster_max
        FROM
          histogram fd_1
        GROUP BY
          fd_1.id
      ) mf ON ((mf.id = h.id))
    )
  GROUP BY
    h.id,
    mf.cluster_max
),
pairwise_similarity AS (
  SELECT
    v.id,
    v.source AS source1,
    cj.name AS name2,
    cj.source AS source2,
    v.name AS name1,
    ratio(v.name, cj.name) AS similarity
  FROM
    (
      country_entries v
      CROSS JOIN country_entries cj
    )
  WHERE
    (
      (v.id = cj.id)
      AND (v.source < cj.source)
    )
  ORDER BY
    v.id,
    (ratio(v.name, cj.name)) DESC
),
stats_similarity AS (
  SELECT
    pairwise_similarity.id,
    min(pairwise_similarity.similarity) AS min_similarity,
    avg(pairwise_similarity.similarity) AS avg_similarity,
    max(pairwise_similarity.similarity) AS max_similarity,
    stddev(pairwise_similarity.similarity) AS std_dev_similarity,
    (
      max(pairwise_similarity.similarity) - min(pairwise_similarity.similarity)
    ) AS range_similarity
  FROM
    pairwise_similarity
  GROUP BY
    pairwise_similarity.id
),
results AS (
  SELECT
    histogram_stats.id,
    histogram_stats.entries,
    histogram_stats.sample_size,
    histogram_stats.cluster_max,
    histogram_stats.cluster_min,
    histogram_stats.cluster_avg,
    CASE
      WHEN (histogram_stats.cluster_stddev IS NULL) THEN (0) :: numeric
      ELSE histogram_stats.cluster_stddev
    END AS cluster_stddev,
    histogram_stats.cluster_range,
    histogram_stats.cluster_count,
    histogram_stats.mode_count,
    histogram_stats.mode_score,
    stats_similarity.min_similarity,
    stats_similarity.max_similarity,
    stats_similarity.avg_similarity,
    stats_similarity.range_similarity,
    CASE
      WHEN (stats_similarity.std_dev_similarity IS NULL) THEN (0) :: double precision
      ELSE stats_similarity.std_dev_similarity
    END AS std_dev_similarity
  FROM
    (
      histogram_stats
      JOIN stats_similarity USING (id)
    )
)
SELECT
  results.id,
  results.entries,
  results.sample_size,
  results.cluster_max,
  results.cluster_min,
  results.cluster_avg,
  results.cluster_stddev,
  results.cluster_range,
  results.cluster_count,
  results.mode_count,
  results.mode_score,
  results.max_similarity AS similarity_max,
  results.min_similarity AS similarity_min,
  results.avg_similarity AS similarity_avg,
  results.std_dev_similarity AS similarity_stddev,
  results.range_similarity AS similarity_range
FROM
  results;