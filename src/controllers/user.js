import express from "express";
import bcrypt from "bcrypt";
import Clarifai from "clarifai";
import getHashByEmail from "../db/knex/users/getHashByEmail.js";
import getUserByEmail from "../db/knex/users/getUserByEmail.js";
import addUser from "../db/knex/users/addUser.js";
import getUserById from "../db/knex/users/getUserById.js";
import updateEntries from "../db/knex/users/updateEntries.js";
import updateName from "../db/knex/users/updateName.js";
import updateEmail from "../db/knex/users/updateEmail.js";

const saltRounds = 10;
const userRouter = express.Router();
const clarifaiApp = new Clarifai.App({apiKey: process.env.KEY});

// POST /user/signIn
userRouter.post("/signIn", async (req, res) => {
    const userLogin = await getHashByEmail(req.body.email);
    if (userLogin === -1) return res.status(500).json("error signing in");
    if (userLogin === -2) return res.status(400).json("invalid username or password");
    if (!(await bcrypt.compare(req.body.password, userLogin.hash))) return res.status(400).json("invalid username or password");
    const user = await getUserByEmail(req.body.email);
    if (user === -1) return res.status(500).json("error signing in");
    if (user === -2) return res.status(400).json("invalid username or password");
    res.status(200).json(user);
});

// POST /user/signUp
userRouter.post("/signUp", async (req, res) => {
    if (req.body.name === "" || req.body.email === "" || req.body.password === "") return res.status(400).json("name, email, or password cannot be empty");
    const user = await getUserByEmail(req.body.email);
    if (user === -1) return res.status(500).json("error signing up");
    else if (user !== -2 && user !== -1) return res.status(400).json("this email has already been used");
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await addUser(req.body.name, req.body.email, hash);
    if (newUser === -1) return res.status(500).json("error signing up");
    res.status(201).json(newUser);
});

// GET /user/profile/:id
userRouter.get("/profile/:id", async (req, res) => {
    const user = await getUserById(req.params.id);
    if (user === -1) return res.status(500).json("error getting profile");
    if (user === -2) return res.status(404).json("user not found");
    res.status(201).json(user);
});

// POST /user/carifai
userRouter.post("/clarifai", async(req, res) => {
    try {
        const data = await clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input);
        res.status(200).json(data);
    } catch (err) {
        // do not return err since it contains api key
        res.status(400).json("invalid image url");
    }
});

// PUT /user/entries
userRouter.put("/entries", async (req, res) => {
    const entries = await updateEntries(req.body.id);
    if (entries === -1) return res.status(500).json("error updating user entries");
    if (entries === -2) return res.status(404).json("user not found");
    res.status(200).json(entries);
});

// PUT /user/name
userRouter.put("/name", async (req, res) => {
    if (req.body.name === "") return res.status(400).json("name cannot be empty");
    const name = await updateName(req.body.id, req.body.name);
    if (name === -1) return res.status(500).json("error updating name");
    if (name === -2) return res.status(404).json("user not found");
    res.status(200).json(name);
});

// PUT /user/email
userRouter.put("/email", async (req, res) => {
    if (req.body.email === "") return res.status(400).json("name cannot be empty");
    const user = await getUserByEmail(req.body.email);
    if (user === -1) return res.status(500).json("error updating email");
    else if (user !== -2 && user !== -1) return res.status(400).json("this email has already been used");
    const email = await updateEmail(req.body.id, req.body.email);
    if (email === -1) return res.status(500).json("error updating email");
    if (email === -2) return res.status(404).json("user not found");
    res.status(200).json(email);
});

// PUT /user/password
userRouter.put("/password", async (req, res) => {

});

export default userRouter;