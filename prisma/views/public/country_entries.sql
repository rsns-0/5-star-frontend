WITH all_data AS (
  SELECT
    rcand.id,
    rcand.cca3 AS iso2,
    cj.name,
    cj.source
  FROM
    (
      (
        (
          (
            (
              (
                (
                  rest_countries_api_new_data rcand
                  LEFT JOIN rest_countries_api_data_names rcadn ON (
                    (
                      rcand.rest_countries_api_data_names_id = rcadn.id
                    )
                  )
                )
                LEFT JOIN countries c ON ((rcand.cca3 = c.iso3))
              )
              LEFT JOIN wiki_iso_data wid ON ((c.iso2 = wid.iso2))
            )
            LEFT JOIN iban_country_code_data iccd ON ((rcand.id = iccd.rest_countries_api_new_data_id))
          )
          LEFT JOIN wiki_data wd ON ((rcand.id = wd.rest_countries_api_new_data_id))
        )
        LEFT JOIN new_cia_language_data ncld ON ((rcand.id = ncld.rest_countries_api_new_data_id))
      )
      CROSS JOIN LATERAL (
        SELECT
          unnest(
            ARRAY [rcadn.official, rcadn.common, rcand.name, c.name, wid.name, c.local_name, ncld.country, wd.country_or_region]
          ) AS name,
          unnest(
            ARRAY ['rest_countries_api_data_names.official'::text, 'rest_countries_api_data_names.common'::text, 'rest_countries_api_new_data.name'::text, 'countries.name'::text, 'wiki_iso_data.name'::text, 'countries.local_name'::text, 'new_cia_language_data.country'::text, 'wiki_data.country_or_region'::text]
          ) AS source
      ) cj
    )
),
filter_null_or_blank AS (
  SELECT
    all_data.id,
    all_data.iso2,
    all_data.name,
    all_data.source
  FROM
    all_data
  WHERE
    (
      (all_data.name IS NOT NULL)
      AND (all_data.name <> '' :: text)
    )
)
SELECT
  filter_null_or_blank.id,
  filter_null_or_blank.iso2,
  filter_null_or_blank.name,
  filter_null_or_blank.source
FROM
  filter_null_or_blank;