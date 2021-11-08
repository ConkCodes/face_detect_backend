import express from "express";

const app = express();

app.use(express.json());

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
checks: n/a
*/
app.get("/", (req, res) => {
    res.status(200).json(db.users);
});

/*
POST /signIn
request: req.body.email, req.body.password
response: user object
description: receives user input email and password and checks if they exist in the database. if exists, the a user object is returned, otherwise error
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
description: receives user name, email, and password and checks if the email exists in the database. if unique, the user is added to the database and a new user object is returned, 
    otherwise error
*/
app.post("/signUp", (req, res) => {
    let i = 0;
    let found = false;
    while (i < db.users.length && !found) {
        if (db.users[i].email === req.body.email) found = true;
        else i++;
    }
    if (!found) {
        const newId = 123 + db.users.length;
        const newUser = {
            id: newId.toString(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            entries: 0,
            joined: new Date()
        }
        db.users.push(newUser);
        res.status(200).json(newUser);
    } else res.status(400).json("email already exists in the database");
});

/*
GET profile/:id
request: req.params.id
response: user object
description: receives an user id and checks if they exist in the database. if exists, the a user object is returned, otherwise error
*/
app.get("/profile/:id", (req, res) => {
    let i = 0;
    let found = false;
    while (i < db.users.length && !found) {
        if (db.users[i].id === req.params.id) found = true;
        else i++;
    }
    if (found) return res.status(200).json(db.users[i]);
    else return res.status(400).json("user does not exist");
});

/*
PUT /entries
request: req.body.id
response: user entries
description: receives an user id and checks if they exist in the database. if exists, the a user entries is updated and returned, otherwise error
*/
app.put("/entries", (req, res) => {
    let i = 0;
    let found = false;
    while (i < db.users.length && !found) {
        if (db.users[i].id === req.body.id) found = true;
        else i++;
    }
    if (found) {
        db.users[i].entries++;
        return res.status(200).json(db.users[i].entries);
    } else return res.status(400).json("user does not exist");
});

app.listen(3000);