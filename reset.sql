DELIMITER '//';

DROP TABLE "internship";

DROP TABLE "candidate_info";

DO $$ BEGIN
    IF EXISTS (
        SELECT
            1
        FROM
            pg_type
        WHERE
            typname = 'internship_direction'
    ) THEN DROP TYPE INTERNSHIP_DIRECTION;

END IF;

IF EXISTS (
    SELECT
        1
    FROM
        pg_type
    WHERE
        typname = 'work_schedule'
) THEN DROP TYPE WORK_SCHEDULE;

END IF;

DROP TABLE IF EXISTS "referral";

DROP TABLE IF EXISTS "user_profile";

DROP TABLE IF EXISTS "user";

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
