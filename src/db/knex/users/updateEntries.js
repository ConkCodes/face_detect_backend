import db from "../../index.js";

// UPDATE users SET entries = entries + 1 WHERE id = id RETURNING entries;
const updateEntries = async (id) => {
    try {
        const entries = await db("users").increment({entries: 1}).where({id: id}).returning("entries");
        if (entries.length === 0) return -2;
        return entries[0];
    } catch (err) {
        return -1;
    }
}

export default updateEntries;