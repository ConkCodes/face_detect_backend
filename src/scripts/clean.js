import deleteTables from "../db/sql/core/deleteTables.js";
import createTables from "../db/sql/core/createTables.js";

const clean = async () => {
    try {
        // clean db
        await deleteTables();
        await createTables();
        // success
        console.log("the database has been cleaned");
    // error
    } catch (err) {
        console.log("an error has occurred while viewing the database");
    }
}

await clean();
process.exit();