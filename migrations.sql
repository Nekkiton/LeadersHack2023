DELIMITER '//';

DO $$ BEGIN
    IF NOT EXISTS (
        SELECT
            1
        FROM
            pg_type
        WHERE
            typname = 'user_role'
    ) THEN CREATE TYPE USER_ROLE AS ENUM (
        'admin',
        'nobody',
        'candidate',
        'intern',
        'mentor',
        'HR',
        'supervisor'
    );

END IF;

CREATE TABLE IF NOT EXISTS "user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "role" USER_ROLE NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "passwordHash" VARCHAR(1000) NOT NULL
);

INSERT INTO
    "user" ("role", "email", "passwordHash")
VALUES
    (
        'admin',
        'admin@example.com',
        '$2b$10$zXWjkOJUCnNrG9CL3HT8vevztpbfltWgOZE64MnalRSGiaOvR6y0e'
    ) ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS "user_profile" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "userId" UUID NOT NULL UNIQUE,
    "name" VARCHAR(255) NOT NULL,
    "surname" VARCHAR(255) NOT NULL,
    "patronymic" VARCHAR(255) NULL,
    "residency" VARCHAR(1000) NULL,
    "photo" VARCHAR(1000) NULL,
    FOREIGN KEY("userId") REFERENCES "user"("id")
);

CREATE TABLE IF NOT EXISTS "referral" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "referralId" VARCHAR(255) NOT NULL UNIQUE,
    "userId" UUID NOT NULL UNIQUE,
    FOREIGN KEY("userId") REFERENCES "user"("id")
);

END $$
