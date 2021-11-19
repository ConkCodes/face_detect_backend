import express from "express";
import bcrypt from "bcrypt";
import db from "../db/index.js";
import getHashByEmail from "../db/sql/users/getHashByEmail.js";
import getUserByEmail from "../db/sql/users/getUserByEmail.js";

const saltRounds = 10;
const userRouter = express.Router();

/*
POST /user/signIn
request: req.body.email, req.body.password
response: user object
description: 
    SELECT `email`, `hash` FROM `login` WHERE `email` = req.params.id
    receives user input email and password and checks if they exist in the database. 
    if exists, the a user object is returned, 
    otherwise error
*/
userRouter.post("/signIn", async (req, res) => {
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
        if (user === -1 || user === -2) return res.status(400).json("error signing in");
        // success
        res.status(200).json(user);
    // error
    } catch (err) {
        res.status(400).json("error signing in");
    }
});

/*
POST /user/signUp
request: req.body.name, req.body.email, req.body.password
response: user object
description: 
    INSERT INTO `users` (`name`, `email`, `entries`, `joined`) VALUES (req.body.name, req.body.email, 0, new Date())
    receives user name, email, and password and checks if the email exists in the database (since email must be UNIQUE). 
    if unique, the user is added to the database and a new user object is returned, 
    otherwise error
*/
userRouter.post("/signup", async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        db.transaction(async trx => {
            try {
                await trx("login").insert({email: req.body.email, hash: hash});
                const user = await trx("users").insert({name: req.body.name, email: req.body.email, joined: new Date()}).returning("*");
                res.status(200).json(user[0]);
                trx.commit;
            } catch (err) {
                res.status(400).json("error signing up");
                trx.rollback;
            }
        });
    } catch (err) {
        res.status(400).json("error signing up");
    }
});

/*
GET /user/profile/:id
request: req.params.id
response: user object
description: 
    SELECT `*` FROM `users` WHERE `id` = req.params.id
    receives an user id and checks if they exist in the database. 
    if exists, the a user object is returned, 
    otherwise error
*/
userRouter.get("/profile/:id", async (req, res) => {
    try {
        const user = await db("users").select("*").where({id: req.params.id});
        if (user.length === 0) res.status(400).json("user does not exist");
        else res.status(200).json(user[0]);
    } catch (err) {
        res.status(400).json("error getting user");
    }
});

/*
PUT /user/entries
request: req.body.id
response: user entries
description: 
    UPDATE `users` SET `entries` = `entries` + 1 WHERE `id` = req.body.id
    RETURNING entries
    receives an user id and checks if they exist in the database. 
    if exists, the a user entries is updated and returned, 
    otherwise error
*/
userRouter.put("/entries", async (req, res) => {
    try {
        const entries = await db("users").increment({entries: 1}).where({id: req.body.id}).returning("entries");
        if (entries.length === 0) res.status(400).json("user does not exist");
        else res.status(200).json(entries[0]);
    } catch (err) {
        res.status(400).json("error getting user");
    }
});

export default userRouter;