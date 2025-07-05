/** @type {import("drizzle-kit").Config} */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url:"postgresql://neondb_owner:npg_ZOPxH1wSKg9M@ep-mute-sound-a5wetbcg-pooler.us-east-2.aws.neon.tech/micropen?sslmode=require&channel_binding=require",
  },
};
