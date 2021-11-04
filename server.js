import express from "express";

const app = express();

app.use(express.json());

// temp database
const database = {
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

// GET root
// returns All Users
app.get("/", (request, response) => {
    response.status(200).json(database.users);
});

// POST signIn
// returns User Object
// checks if email and password exist in the database
app.post("/signIn", (request, response) => {
    let i = 0;
    let found = false;
    while (i < database.users.length && !found) {
        if (database.users[i].email === request.body.email && database.users[i].password === request.body.password) found = true;
        else i++;
    }
    if (found) return response(database.users[i]);
    else return response.status(400).json("invalid username or password");
});

// POST signUp
// returns User Object
// checks if email exists in the database
app.post("/signUp", (request, response) => {
    let i = 0;
    let found = false;
    while (i < database.users.length && !found) {
        if (database.users[i].email === request.body.email) found = true;
        else i++;
    }
    if (!found) {
        const newId = 123 + database.users.length;
        const newUser = {
            id: newId.toString(),
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            entries: 0,
            joined: new Date()
        }
        database.users.push(newUser);
        response.json(newUser);
    } else response.status(400).json("this email already exists in the database");
});



app.listen(3000);