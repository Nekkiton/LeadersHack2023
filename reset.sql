DELIMITER '//';

DROP TABLE IF EXISTS "referral";

DROP TABLE IF EXISTS "userProfile";

DROP TABLE IF EXISTS "user";

DO $$ BEGIN
    IF EXISTS (
        SELECT
            1
        FROM
            pg_type
        WHERE
            typname = 'user_role'
    ) THEN DROP TYPE USER_ROLE;

END IF;

END $$
