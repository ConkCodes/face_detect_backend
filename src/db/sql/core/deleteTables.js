import db from "../../index.js";

const deleteTables = async () => {
    try {
        // DROP TABLE IF EXISTS users;
        await db.schema.dropTableIfExists('users');
        // DROP TABLE IF EXISTS logins;
        await db.schema.dropTableIfExists('logins');
        // success
        console.log("all tables have been deleted");
    // error
    } catch (err) {
        console.log("an error has occurred while deleting the tables");
    }
}

export default deleteTables;