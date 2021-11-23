import db from "../../index.js";

/*
description: SELECT email, hash FROM login WHERE email = email;
input: user email
output: user login || error 1 || error 2
*/
const getHashByEmail = async (email) => {
    try {
        const userLogin = await db("logins").select("email", "hash").where({email: email});
        if (userLogin.length !== 0) return userLogin[0];
        else return -2;
    } catch (err) {
        return -1;
    }
}

export default getHashByEmail;