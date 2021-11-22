import users from "../assets/users.js";
import bcrypt from "bcrypt";
import getUserByEmail from "../db/sql/users/getUserByEmail.js";
import addUser from "../db/sql/users/addUser.js";

const saltRounds = 10;

const populate = async () => {
    try {
        // iterate throught test users
        const n = users.length;
        for (let i = 0; i < n; i++) {
            // check if email does not already exist
            const user = await getUserByEmail(users[i].email);
            if (user.id) {
                console.log(users[i].email + " has already been used");
                continue;
            }
            if (user === -1) {
                console.log("error signing up " + users[i].email);
                continue;
            }
            // hash password
            const hash = await bcrypt.hash(users[i].password, saltRounds);
            // attempt to add user to database
            const newUser = await addUser(users[i].name, users[i].email, hash);
            if (newUser === -1) {
                console.log("error signing up " + users[i].email);
                continue;
            }
            // success
            console.log(users[i].email + " was signed up");
        }
    // error
    } catch (err) {
        console.log("an error has occurred while populating the database");
    }
    console.log("finished");
}

await populate();
process.exit();