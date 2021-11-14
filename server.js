import express from "express";
import cors from "cors";
import bcrypt from "bcrypt-nodejs";
import knex from "knex";

const app = express();
app.use(express.json());
app.use(cors());

const pg = knex({
    client: "pg",
    connection: {
        host : "127.0.0.1",
        port : 5432,
        user : "pgUsername",
        password : "pgPassword",
        database : "dbName"
    }
});

// temp database
const db = {
    users: [
        {
            id: "123",
            name: "John",
            email: "john@gmail.com",
            password: "cookies",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "Sally",
            email: "sally@gmail.com",
            password: "bananas",
            entries: 0,
            joined: new Date()
        }
    ]
}

/*
GET /
request: n/a
response: all users objects
description: SELECT `*` FROM `users`
*/
app.get("/", async (req, res) => {
    try {
        const users = await pg("users").select("*");
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json("error");
    }
});

/*
POST /signIn
request: req.body.email, req.body.password
response: user object
description: 
    receives user input email and password and checks if they exist in the database. 
    if exists, the a user object is returned, 
    otherwise error
*/
app.post("/signIn", (req, res) => {
    let i = 0;
    let found = false;
    while (i < db.users.length && !found) {
        if (db.users[i].email === req.body.email && db.users[i].password === req.body.password) found = true;
        else i++;
    }
    if (found) return res.status(200).json(db.users[i]);
    else return res.status(400).json("invalid username or password");
});

/*
POST /signUp
request: req.body.name, req.body.email, req.body.password
response: user object
description: 
    INSERT INTO `users` (`name`, `email`, `entries`, `joined`) VALUES (req.body.name, req.body.email, 0, new Date())
    receives user name, email, and password and checks if the email exists in the database (since email must be UNIQUE). 
    if unique, the user is added to the database and a new user object is returned, 
    otherwise error
*/
app.post("/signup", async (req, res) => {
    try {
        const user = await pg("users").insert({
            name: req.body.name, 
            email: req.body.email, 
            entries: 0, 
            joined: new Date()
        }).returning("*");
        res.status(200).json(user[0]);
    } catch (err) {
        res.status(400).json("error signing up");
    }
});

/*
GET profile/:id
request: req.params.id
response: user object
description: 
    SELECT `*` FROM `users` WHERE `id` = req.params.id
    receives an user id and checks if they exist in the database. 
    if exists, the a user object is returned, 
    otherwise error
*/
app.get("/profile/:id", async (req, res) => {
    try {
        const user = await pg("users").select("*").where({id: req.params.id});
        if (user.length === 0) res.status(400).json("user does not exist");
        else res.status(200).json(user[0]);
    } catch (err) {
        res.status(400).json("error getting user");
    }
});

/*
PUT /entries
request: req.body.id
response: user entries
description: 
    UPDATE `users` SET `entries` = `entries` + 1 WHERE `id` = req.body.id
    RETURNING entries
    receives an user id and checks if they exist in the database. 
    if exists, the a user entries is updated and returned, 
    otherwise error
*/
app.put("/entries", async (req, res) => {
    try {
        const entries = await pg("users").increment({entries: 1}).where({id: req.body.id}).returning("entries");
        if (entries.length === 0) res.status(400).json("user does not exist");
        else res.status(200).json(entries[0]);
    } catch (err) {
        res.status(400).json("error getting user");
    }
});

app.listen(3000);