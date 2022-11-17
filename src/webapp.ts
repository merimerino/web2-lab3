import express from "express";
import fs from "fs";
import path, { dirname } from "path";
import https from "https";
import bodyParser from "body-parser";
import dotenv from "dotenv";
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);
app.use("/public", express.static(path.join(__dirname, "public")));

const externalURL = process.env.RENDER_EXTERNAL_URL;

const port =
  externalURL && process.env.PORT ? parseInt(process.env.PORT) : 4080;

app.get("/", function (req, res) {
  res.render("index");
});

if (externalURL) {
  const hostname = "127.0.0.1";
  app.listen(port, hostname, function () {
    console.log(
      `Server running at https://${hostname}:${port}/ and from outside on ${externalURL}`
    );
  });
} else {
  https
    .createServer(
      {
        key: fs.readFileSync("server.key"),
        cert: fs.readFileSync("server.cert"),
      },
      app
    )
    .listen(port, function () {
      console.log(`Server running at https://localhost:${port}/`);
    });
}
