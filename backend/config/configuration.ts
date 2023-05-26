export default () => ({
  port: 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'internship',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    saltRounds: 10,
    expiresIn: 60 * 60 * 24, // temporary set to 24 hours. TODO - set lower (e.g 3 hours)
  },
});
