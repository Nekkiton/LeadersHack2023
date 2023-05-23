DO $$
	BEGIN
        CREATE TABLE IF NOT EXISTS "user" (
            "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
            "username" VARCHAR(255) NOT NULL,
            "passwordHash" TEXT NOT NULL,
            PRIMARY KEY ("id"),
            UNIQUE ("username")
        );
	END
$$;
