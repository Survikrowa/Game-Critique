-- Backfill existing HLTB identifiers
INSERT INTO "game_source_id" ("game_id", "source", "external_id", "created_at", "updated_at")
SELECT "id", 'HLTB'::"GameDataSource", "hltb_id"::text, NOW(), NOW()
FROM "games"
ON CONFLICT ("source", "external_id") DO NOTHING;
