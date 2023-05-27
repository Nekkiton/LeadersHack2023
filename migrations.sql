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
        'curator',
        'staff'
    );

END IF;

CREATE TABLE IF NOT EXISTS "user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "role" USER_ROLE NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "passwordHash" VARCHAR(1000) NOT NULL
);

INSERT INTO
    "user" ("id", "role", "email", "passwordHash")
VALUES
    (
        '00000000-0000-0000-0000-000000000001',
        'admin',
        'admin@example.com',
        '$2b$10$zXWjkOJUCnNrG9CL3HT8vevztpbfltWgOZE64MnalRSGiaOvR6y0e'
    ),
    (
        '00000000-0000-0000-0000-000000000002',
        'candidate',
        'candidate@example.com',
        '$2b$10$ROEIK2dJf/ToS2xM10anyu0tXV5GishzfZQi.e4287cdnLuZ3Xk0.'
    ),
    (
        '00000000-0000-0000-0000-000000000003',
        'intern',
        'intern@example.com',
        '$2b$10$XJl4MdPA.28VMjOgXXQjkuHJVPIzLFsHaSwsbJqScyfFuoNUWlNGm'
    ),
    (
        '00000000-0000-0000-0000-000000000004',
        'mentor',
        'mentor@example.com',
        '$2b$10$pXvTggaKsdMA3VmpIda0MePpWSVlJektbfOvF6nwLQhbFcY5oSFYi'
    ),
    (
        '00000000-0000-0000-0000-000000000005',
        'staff',
        'staff@example.com',
        '$2b$10$SeuqglJpT.kRhgR31QIye.4Mvw0V7fx.XVKlWgxDA6aesFFp9IiFC'
    ),
    (
        '00000000-0000-0000-0000-000000000006',
        'nobody',
        'nobody@example.com',
        '$2b$10$ksf.zVF0WMYSwmZHZDpBG.dHnFxtKnThyPiu1tRbOhnNHn.qZZTLe'
    ) ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS "user_profile" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "userId" UUID NOT NULL UNIQUE,
    "name" VARCHAR(255) NOT NULL,
    "surname" VARCHAR(255) NOT NULL,
    "patronymic" VARCHAR(255) NULL,
    "birthday" DATE NOT NULL,
    "citizenship" VARCHAR(255) NOT NULL,
    "location" VARCHAR(1000) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "photo" VARCHAR(1000) NULL,
    FOREIGN KEY("userId") REFERENCES "user"("id")
);

INSERT INTO
    "user_profile" (
        "id",
        "userId",
        "name",
        "surname",
        "patronymic",
        "birthday",
        "citizenship",
        "location",
        "phone"
    )
VALUES
    (
        '00000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000002',
        'candidate name',
        'candidate surname',
        'candidate patronymic',
        '2000-01-01',
        'candidate citizenship',
        'candidate location',
        'candidate phone'
    ) ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS "referral" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "referralId" VARCHAR(255) NOT NULL UNIQUE,
    "userId" UUID NOT NULL UNIQUE,
    FOREIGN KEY("userId") REFERENCES "user"("id")
);

END $$
