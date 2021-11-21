import express from "express";
import bcrypt from "bcrypt";
import getHashByEmail from "../db/sql/users/getHashByEmail.js";
import getUserByEmail from "../db/sql/users/getUserByEmail.js";
import addUser from "../db/sql/users/addUser.js";
import getUserById from "../db/sql/users/getUserById.js";
import incrementEntries from "../db/sql/users/incrementEntries.js";

const saltRounds = 10;
const userRouter = express.Router();

/*
POST /user/signIn
description: signs in a user and responds with the user's data.
request: req.body.email, req.body.password
response: user object
*/
userRouter.post("/signIn", async (req, res) => {
    // ADD pre-checks such as - valid password length, valid email
    try {
        // attempt to get hash by email
        const userLogin = await getHashByEmail(req.body.email);
        if (userLogin === -1) return res.status(400).json("error signing in");
        if (userLogin === -2) return res.status(400).json("invalid username or password");
        // check if input password matches hash
        const result = await bcrypt.compare(req.body.password, userLogin.hash);
        if (result === false) return res.status(400).json("invalid username or password");
        // attempt to get user object by email
        const user = await getUserByEmail(req.body.email);
        if (user === -1) return res.status(400).json("error signing in");
        if (user === -2) return res.status(400).json("invalid username or password");
        // success
        res.status(200).json(user);
    // error
    } catch (err) {
        res.status(400).json("error signing in");
    }
});

/*
POST /user/signUp
description: signs up a user and responds witht the user's data.
request: req.body.name, req.body.email, req.body.password
response: user object
*/
userRouter.post("/signup", async (req, res) => {
    try {
        // check if email does not already exist
        const user = await getUserByEmail(req.body.email);
        if (user.id) return res.status(400).json("this email has already been used");
        if (user === -1) return res.status(400).json("error signing up");
        // hash password
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        // attempt to add user to database
        const newUser = await addUser(req.body.name, req.body.email, hash);
        if (newUser === -1) return res.status(400).json("error signing up");
        // success
        res.status(200).json(newUser);
    // error
    } catch (err) {
        res.status(400).json("error signing up");
    }
});

/*
GET /user/profile/:id
description: gets a user's data.
request: req.params.id
response: user object
*/
userRouter.get("/profile/:id", async (req, res) => {
    try {
        // attempt to get user by id
        const user = await getUserById(req.params.id);
        if (user === -1) return res.status(400).json("error getting profile");
        if (user === -2) return res.status(400).json("user does not exist");
        // success
        res.status(200).json(user);
    // error
    } catch (err) {
        res.status(400).json("error getting profile");
    }
});

/*
PUT /user/entries
description: updates a user's entry count.
request: req.body.id
response: user entries
*/
userRouter.put("/entries", async (req, res) => {
    try {
        // attempt to get increment user entries
        const entries = await incrementEntries(req.body.id);
        if (entries === -1) return res.status(400).json("error getting user");
        if (entries === -2) return res.status(400).json("user does not exist");
        // success
        res.status(200).json(entries);
    // error
    } catch (err) {
        res.status(400).json("error getting user");
    }
});

export default userRouter;