import db from "../../index.js";

/*
description: UPDATE users SET entries = entries + 1 WHERE id = id RETURNING entries;
input: user id
output: user login || error 1 || error 2
*/
const incrementEntries = async (id) => {
    try {
        const entries = await db("users").increment({entries: 1}).where({id: id}).returning("entries");
        if (entries.length !== 0) entries[0];
        else -2;
    } catch (err) {
        return -1;
    }
}

export default incrementEntries;