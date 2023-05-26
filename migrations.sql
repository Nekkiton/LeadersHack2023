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

CREATE TABLE IF NOT EXISTS "userProfile" (
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
