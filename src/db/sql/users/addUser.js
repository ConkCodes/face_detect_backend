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
    db.transaction(async trx => {
        try {
            await trx("login").insert({email: email, hash: hash});
            const user = await trx("users").insert({name: name, email: email, joined: new Date()}).returning("*");
            trx.commit;
            return user[0];
        } catch (err) {
            trx.rollback;
            return -1;
        }
    });
}

export default addUser;