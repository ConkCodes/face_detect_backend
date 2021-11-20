import db from "../../index.js";

/*
description: SELECT * FROM login WHERE email = email;
input: user email
output: user login || error 1 || error 2
*/
const getUserByEmail = async (email) => {
    try {
        const user = await db("users").select("*").where({email: email});
        if (user.length !== 0) return user[0];
        else return -2;
    } catch (err) {
        return -1;
    }
}

export default getUserByEmail;