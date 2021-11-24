import db from "../../index.js";

// SELECT * FROM login WHERE email = email;
const getUserByEmail = async (email) => {
    try {
        const user = await db("users").select("*").where({email: email});
        if (user.length === 0) return -2;
        return user[0];
    } catch (err) {
        return -1;
    }
}

export default getUserByEmail;