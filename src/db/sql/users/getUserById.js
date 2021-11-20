import db from "../../index.js";

/*
description: SELECT * FROM login WHERE id = id;
input: user id
output: user login || error 1 || error 2
*/
const getUserById = async (id) => {
    try {
        const user = await db("users").select("*").where({id: id});
        if (user.length !== 0) return user[0];
        else return -2;
    } catch (err) {
        return -1;
    }
}

export default getUserById;