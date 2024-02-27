SELECT
  combined_tables.id,
  combined_tables.iso2,
  combined_tables.name,
  combined_tables.source
FROM
  (
    SELECT
      languages.id,
      languages.iso_639_2 AS iso2,
      unnested.name,
      unnested.source
    FROM
      (
        (
          (
            (
              (
                languages
                LEFT JOIN congress_iso_mappings ON (
                  (
                    languages.id = congress_iso_mappings.languages_id
                  )
                )
              )
              LEFT JOIN lingohub_iso_mappings ON (
                (
                  languages.id = lingohub_iso_mappings.languages_id
                )
              )
            )
            LEFT JOIN new_cia_language_data ON (
              (
                languages.id = new_cia_language_data.languages_id
              )
            )
          )
          LEFT JOIN wals_language_data ON ((languages.id = wals_language_data.languages_id))
        )
        LEFT JOIN LATERAL (
          SELECT
            unnest(
              string_to_array(
                unnest(
                  ARRAY [languages.name, congress_iso_mappings.english_name_of_language, lingohub_iso_mappings.language, new_cia_language_data.primary_language, wals_language_data.name]
                ),
                ';' :: text
              )
            ) AS name,
            unnest(
              ARRAY ['languages'::text, 'congress_iso_mappings.english_name_of_language'::text, 'lingohub_iso_mappings.language'::text, 'new_cia_language_data.primary_language'::text, 'wals_language_data.name'::text]
            ) AS source
        ) unnested ON (TRUE)
      )
  ) combined_tables
WHERE
  (
    (combined_tables.name IS NOT NULL)
    AND (combined_tables.name <> '' :: text)
  )
UNION
ALL
SELECT
  languages.id,
  languages.iso_639_2 AS iso2,
  languages.name,
  '_languagesTorest_countries_api_new_data.name' :: text AS source
FROM
  (
    "_languagesTorest_countries_api_new_data"
    JOIN languages ON (
      (
        "_languagesTorest_countries_api_new_data"."A" = languages.id
      )
    )
  )
WHERE
  (
    (languages.name IS NOT NULL)
    AND (languages.name <> '' :: text)
  );