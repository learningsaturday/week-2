"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const firebase = require("firebase-admin");
const bodyParser = require("body-parser");
const Sentry = require("@sentry/node");
const path = require("path");

const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_DIR);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
});

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENV || "development"
});

const db = firebase.firestore();
const storage = firebase.storage();

app.use(cors());

app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    }
  })
);

app.get("/", express.static(path.join(__dirname, "public")));

app.get("/users", (req, res, next) => res.send("Hello World!"));

app.post("/users/new", (req, res, next) => {
  console.log(req.body);
  res.send("Hello World!");
});

app.listen(process.env.PORT, () =>
  console.log(`Server app listening on port ${process.env.PORT}!`)
);
