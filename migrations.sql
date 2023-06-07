DELIMITER '//';

DO $$ BEGIN
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
    ),
    (
        '00000000-0000-0000-0000-000000000007',
        'curator',
        'curator@example.com',
        '$2b$10$SeuqglJpT.kRhgR31QIye.4Mvw0V7fx.XVKlWgxDA6aesFFp9IiFC'
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
        '00000000-0000-0000-0000-000000000001',
        'admin name',
        'admin surname',
        'admin patronymic',
        '2000-01-01',
        'admin citizenship',
        'admin location',
        'admin phone'
    ),
    (
        '00000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000002',
        'candidate name',
        'candidate surname',
        'candidate patronymic',
        '2000-01-01',
        'candidate citizenship',
        'candidate location',
        'candidate phone'
    ),
    (
        '00000000-0000-0000-0000-000000000003',
        '00000000-0000-0000-0000-000000000003',
        'intern name',
        'intern surname',
        'intern patronymic',
        '2000-01-01',
        'intern citizenship',
        'intern location',
        'intern phone'
    ),
    (
        '00000000-0000-0000-0000-000000000004',
        '00000000-0000-0000-0000-000000000004',
        'mentor name',
        'mentor surname',
        'mentor patronymic',
        '2000-01-01',
        'mentor citizenship',
        'mentor location',
        'mentor phone'
    ),
    (
        '00000000-0000-0000-0000-000000000005',
        '00000000-0000-0000-0000-000000000005',
        'staff name',
        'staff surname',
        'staff patronymic',
        '2000-01-01',
        'staff citizenship',
        'staff location',
        'staff phone'
    ),
    (
        '00000000-0000-0000-0000-000000000006',
        '00000000-0000-0000-0000-000000000007',
        'curator name',
        'curator surname',
        'curator patronymic',
        '2000-01-01',
        'curator citizenship',
        'curator location',
        'curator phone'
    ) ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS "referral" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "referralId" VARCHAR(255) NOT NULL UNIQUE,
    "userId" UUID NOT NULL UNIQUE,
    FOREIGN KEY("userId") REFERENCES "user"("id")
);

IF NOT EXISTS (
    SELECT
        1
    FROM
        pg_type
    WHERE
        typname = 'work_schedule'
) THEN CREATE TYPE WORK_SCHEDULE AS ENUM ('full_week', 'half_week');

END IF;

IF NOT EXISTS (
    SELECT
        1
    FROM
        pg_type
    WHERE
        typname = 'internship_direction'
) THEN CREATE TYPE INTERNSHIP_DIRECTION AS ENUM ('it', 'media', 'social', 'hr', 'town', 'economy');

END IF;

CREATE TABLE IF NOT EXISTS "candidate_info" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "userId" UUID NOT NULL UNIQUE,
    "workSchedule" WORK_SCHEDULE NOT NULL,
    "experience" TEXT,
    "projectActivity" TEXT,
    "about" TEXT,
    "education" JSONB NOT NULL,
    "internshipDirection" INTERNSHIP_DIRECTION NOT NULL,
    FOREIGN KEY("userId") REFERENCES "user"("id")
);

INSERT INTO
    "candidate_info" (
        "id",
        "userId",
        "workSchedule",
        "experience",
        "projectActivity",
        "about",
        "education",
        "internshipDirection"
    )
VALUES
    (
        '00000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000002',
        'full_week',
        'experience',
        'projectActivity',
        'about',
        '"{\"name\":\"education name\",\"specialty\":\"education specialty\",\"graduationYear\":\"2000\"}"',
        'it'
    ) ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS "internship" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "year" VARCHAR(4) NOT NULL UNIQUE,
    "applicationStart" VARCHAR(63) NOT NULL,
    "applicationEnd" VARCHAR(63) NOT NULL,
    "trainingStart" VARCHAR(63) NOT NULL,
    "trainingEnd" VARCHAR(63) NOT NULL,
    "trainingLink" VARCHAR(2048) NOT NULL,
    "examinationStart" VARCHAR(63) NOT NULL,
    "examinationEnd" VARCHAR(63) NOT NULL,
    "examinationLink" VARCHAR(2048) NOT NULL,
    "championshipStart" VARCHAR(63) NOT NULL,
    "championshipEnd" VARCHAR(63) NOT NULL,
    "championshipLink" VARCHAR(2048) NOT NULL,
    "distributionStart" VARCHAR(63) NOT NULL,
    "distributionEnd" VARCHAR(63) NOT NULL,
    "sprintOneStart" VARCHAR(63) NOT NULL,
    "sprintOneEnd" VARCHAR(63) NOT NULL,
    "sprintTwoStart" VARCHAR(63) NOT NULL,
    "sprintTwoEnd" VARCHAR(63) NOT NULL,
    "sprintThreeStart" VARCHAR(63) NOT NULL,
    "sprintThreeEnd" VARCHAR(63) NOT NULL
);

CREATE TABLE IF NOT EXISTS "organization" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(1000) NULL,
    "phone" VARCHAR(255) NULL,
    "email" VARCHAR(255) NULL,
    "logo" VARCHAR(1000) NULL
);

INSERT INTO
    "organization" (
        "id",
        "name",
        "address",
        "phone",
        "email"
    )
VALUES
    (
        '00000000-0000-0000-0000-000000000001',
        'КАРЬЕРНЫЙ ЦЕНТР ПРАВИТЕЛЬСТВА МОСКВЫ',
        'Калужская, ул. Большая Дмитровка, 7/5',
        '+7 (910) 234-56-78',
        'career@moscow.ru'
    ) ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS "employee" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "organizationId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    FOREIGN KEY("organizationId") REFERENCES "organization"("id"),
    FOREIGN KEY("userId") REFERENCES "user"("id"),
    UNIQUE ("organizationId", "userId")
);

INSERT INTO
    "employee" (
        "id",
        "organizationId",
        "userId"
    )
VALUES
    (
        '00000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000004'
    ),
    (
        '00000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000005'
    ) ON CONFLICT DO NOTHING;

IF NOT EXISTS (
    SELECT
        1
    FROM
        pg_type
    WHERE
        typname = 'application_status'
) THEN CREATE TYPE APPLICATION_STATUS AS ENUM (
    'moderation',
    'training',
    'examination',
    'championship',
    'completed'
);

END IF;

CREATE TABLE IF NOT EXISTS "application" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    "userId" UUID NOT NULL,
    "internshipId" UUID NOT NULL,
    "status" APPLICATION_STATUS NOT NULL,
    "score" JSONB,
    "data" JSONB,
    FOREIGN KEY("userId") REFERENCES "user"("id"),
    FOREIGN KEY("internshipId") REFERENCES "internship"("id"),
    UNIQUE ("userId", "internshipId")
);

END $$
