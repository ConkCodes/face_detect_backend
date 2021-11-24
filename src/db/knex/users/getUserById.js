import db from "../../index.js";

// SELECT * FROM login WHERE id = id;
const getUserById = async (id) => {
    try {
        const user = await db("users").select("*").where({id: id});
        if (user.length === 0) return -2;
        return user[0];
    } catch (err) {
        return -1;
    }
}

export default getUserById;