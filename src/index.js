import express from "express";
import cors from "cors";
import userRouter from "./controllers/user.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);

app.get("/", (req, res) => res.status(200).json("success"));

const port = process.env.PORT;

app.listen(port);