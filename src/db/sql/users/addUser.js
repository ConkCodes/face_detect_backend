import db from "../../index.js";

/*
description: 
    INSERT INTO login (email, hash) VALUES (email, hash);
    INSERT INTO users (name, email, joined) VALUES (name, email, new Date());
input: 
    user name
    user email
    user password hash
output: user login || error 1
*/
const addUser = async (name, email, hash) => {
    try {
        return db.transaction(async trx => {
            const userLogin = await trx("login").insert({email: email, hash: hash}).returning("*");
            const user = await trx("users").insert({name: name, email: userLogin[0].email, joined: new Date()}).returning("*");
            return user[0];
        });
    } catch (err) {
        return -1;
    }
}

export default addUser;