import users from "../assets/users.js";
import bcrypt from "bcrypt";
import getUserByEmail from "../db/knex/users/getUserByEmail.js";
import addUser from "../db/knex/users/addUser.js";

const saltRounds = 10;

const populate = async () => {
    try {
        console.log("populating the database with test users 0-9", "\n");
        let used = 0;
        const n = users.length;
        for (let i = 0; i < n; i++) {
            const user = await getUserByEmail(users[i].email);
            if (user.id) {
                console.log("test user " + i + ": error - email '" + users[i].email + "' has already been used");
                used++;
                continue;
            }
            if (user === -1) {
                console.log("test user " + i + ": error - signing up");
                continue;
            }
            const hash = await bcrypt.hash(users[i].password, saltRounds);
            const newUser = await addUser(users[i].name, users[i].email, hash);
            if (newUser === -1) {
                console.log("test user " + i + ": error - signing up");
                continue;
            }
            console.log("test user " + i + ": signed up - login ('" + users[i].email + "', '" + users[i].password + "')");
        }
        console.log();
        if (0 < used) console.log("'npm run clean' wipes the database","\n");
    } catch (err) {
        console.log("an error has occurred while populating the database", "\n");
    }
    console.log("finished");
}

await populate();
process.exit();