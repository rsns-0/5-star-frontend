WITH unioned AS (
  SELECT
    le.id,
    'language' :: text AS TYPE,
    le.iso2,
    le.name
  FROM
    language_entries le
  UNION
  ALL
  SELECT
    ce.id,
    'country' :: text AS TYPE,
    ce.iso2,
    ce.name
  FROM
    country_entries ce
  WHERE
    (
      (ce.name <> '' :: text)
      AND (ce.iso2 <> '' :: text)
    )
)
SELECT
  (unioned.id) :: integer AS id,
  unioned.type,
  unioned.iso2,
  array_agg(unioned.name) AS NAMES
FROM
  unioned
GROUP BY
  unioned.id,
  unioned.type,
  unioned.iso2;