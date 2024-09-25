import express from "express";
import { __dirname } from "./utils.js";
import path from "path";
import cors from "cors";

import config from "./config/config.js";
import handleErrors from "./middlewares/errors/handleErrors.js";
import CustomCountriesRouter from "./dao/routes/customCities.js";

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

const customCountries = new CustomCountriesRouter();

app.use("/countries", customCountries.getRouter());
app.use("*", (req, res) => {
  return res.status(404).json({ payload: "Bad request, 404 url not found" });
});

app.use(handleErrors);

app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT}`);
});
