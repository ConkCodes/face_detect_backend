import db from "../../index.js";

// UPDATE users SET email = email WHERE id = id RETURNING email;
const updateEmail = async (id, newEmail) => {
    try {
        const email = await db("users").update({email: newEmail}).where({id: id}).returning("email");
        if (email.length === 0) return -2;
        return email[0];
    } catch (err) {
        return -1;
    }
}

export default updateEmail;