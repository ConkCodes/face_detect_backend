import db from "../../index.js";

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