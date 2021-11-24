import db from "../../index.js";

// INSERT INTO login (email, hash) VALUES (email, hash);
// INSERT INTO users (name, email, joined) VALUES (name, email, new Date());
const addUser = async (name, email, hash) => {
    try {
        return db.transaction(async trx => {
            await trx("logins").insert({email: email, hash: hash}).returning("*");
            const user = await trx("users").insert({name: name, email: email, joined: new Date()}).returning("*");
            return user[0];
        });
    } catch (err) {
        return -1;
    }
}

export default addUser;