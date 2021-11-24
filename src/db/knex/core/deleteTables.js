import db from "../../index.js";

const deleteTables = async () => {
    try {
        // DROP TABLE IF EXISTS users;
        await db.schema.dropTableIfExists('users');
        // DROP TABLE IF EXISTS logins;
        await db.schema.dropTableIfExists('logins');
        return 1;
    } catch (err) {
        return -1;
    }
}

export default deleteTables;