SELECT
  ce.emoji AS flag_key,
  dlsl.abbreviation AS iso_code
FROM
  (
    (
      (
        discord_flag_emojis dfe
        JOIN rest_countries_api_new_data rcand ON ((rcand.id = dfe.country_id))
      )
      JOIN country_emoji ce ON ((ce.rest_countries_api_new_data_id = rcand.id))
    )
    CROSS JOIN LATERAL (
      SELECT
        dlsl_1.abbreviation
      FROM
        deep_l_supported_languages dlsl_1
      WHERE
        (dlsl_1.languages_id = dfe."languagesId")
      LIMIT
        1
    ) dlsl
  );