import express from "express";

const app = express();

app.use(express.json());

// root
app.get("/", (req, res) => {
    console.log(req.query);
    res.status(200).send("success");
});

app.listen(3000);