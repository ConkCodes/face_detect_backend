import db from "../../index.js";

// UPDATE users SET email = email WHERE id = id RETURNING email;
const updateEmail = async (id, newEmail) => {
    try {
        return db.transaction(async trx => {
            await trx("logins").update({email: newEmail}).where({id: id});
            const email = await trx("users").update({email: newEmail}).where({id: id}).returning("email");
            return email[0];
        })
    } catch (err) {
        return -1;
    }
}

export default updateEmail;