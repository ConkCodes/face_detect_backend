import db from "../../index.js";

// UPDATE logins SET hash = hash WHERE id = id;
const updateName = async (id, newHash) => {
    try {
        await db("logins").update({hash: newHash}).where({id: id}).returning("hash");
        return 1;
    } catch (err) {
        return -1;
    }
}

export default updateName;