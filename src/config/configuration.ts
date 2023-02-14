export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  uri: process.env.MONGO_URI,
  //   database: {
  // host: process.env.DATABASE_HOST,
  // port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  //   },
});
