import deleteTables from "../db/sql/scripts/deleteTables.js";
import createTables from "../db/sql/scripts/createTables.js";

const clean = async () => {
    try {
        // clean db
        await deleteTables();
        await createTables();
        // success
        console.log("the database has been cleaned");
    // error
    } catch (err) {
        console.log("an error has occurred while cleaning the database");
    }
}

clean();
// process.exit();