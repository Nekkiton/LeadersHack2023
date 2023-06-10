export default () => ({
  port: 3000,
  application: {
    referralIdLength: 64,
    generatedPasswordLength: 16,
    moderation: {
      birthday: {
        constraint: {
          operation: 'isAgeBetween',
          values: [18, 35],
        },
        rejectionReason: 'Извините, к стажировке допускаются только граждане от 18 до 35 лет.',
      },
      citizenship: {
        constraint: {
          operation: 'isIncludedIn',
          values: ['Гражданство РФ'],
        },
        rejectionReason: 'Извините, в стажировке могут принять участие только граждане РФ.',
      },
    },
    autoScore: {
      workSchedule: {
        constraint: {
          operation: 'isIncludedIn',
          values: ['full_week'],
        },
        score: 5,
      },
    },
  },
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
