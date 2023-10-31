SELECT
  t.id,
  t.common,
  t.official,
  t."nativeName",
  t.fuzzy_official_top_country,
  t.fuzzy_official_top_country_similarity,
  t.fuzzy_common_top_country,
  t.fuzzy_common_top_country_similarity,
  t.max_official_score_between_common_and_official,
  t.country,
  t.primary_language,
  t.fuzzy_top_country_or_region,
  t.fuzzy_top_country_or_region_similarity,
  t.widely_spoken,
  t.country_or_region,
  t.minority_language,
  t.national_language,
  t.official_language,
  t.regional_language,
  t.primary_language_wiki,
  t.rest_countries_api_data_names_id
FROM
  processed_lang_data t
WHERE
  (
    (
      t.max_official_score_between_common_and_official > 75
    )
    AND (t.fuzzy_top_country_or_region_similarity > 85)
  );