import db from "../../index.js";

// SELECT email, hash FROM login WHERE email = email;
const getHashByEmail = async (email) => {
    try {
        const userLogin = await db("logins").select("email", "hash").where({email: email}); 
        if (userLogin.length === 0) return -2;
        return userLogin[0];
    } catch (err) {
        return -1;
    }
}

export default getHashByEmail;