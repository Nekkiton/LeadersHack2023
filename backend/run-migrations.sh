docker cp migrations/schema.sql backend-postgres-1:/schema.sql;
docker exec backend-postgres-1 psql -U internship -f /schema.sql;
docker exec backend-postgres-1 rm /schema.sql;
