import db from "../../index.js";

// UPDATE users SET name = name WHERE id = id RETURNING name;
const updateName = async (id, newName) => {
    try {
        const name = await db("users").update({name: newName}).where({id: id}).returning("name");
        if (name.length === 0) return -2;
        return name[0];
    } catch (err) {
        return -1;
    }
}

export default updateName;