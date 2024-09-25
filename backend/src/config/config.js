import { configDotenv } from "dotenv";

configDotenv({ override: true, path: "./.env" });

const config = {
  PORT: process.env.PORT,
};

export default config;
