import db from "../../index.js";

const getHashByEmail = async (email) => {
    try {
        const userLogin = await db("login").select("email", "hash").where({email: email});
        if (userLogin.length !== 0) return userLogin[0];
        else return -2;
    } catch (err) {
        return -1;
    }
}

export default getHashByEmail;