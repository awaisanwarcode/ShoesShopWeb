import express from "express";
import cors from "cors";
import Routes from "./Router/Router.js";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/Images", express.static("Images"));
app.use("/TImg", express.static("TransImages"));
app.use(Routes)
app.listen(process.env.PORT, () => {})