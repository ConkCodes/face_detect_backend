import deleteTables from "../db/knex/core/deleteTables.js";
import createTables from "../db/knex/core/createTables.js";

const clean = async () => {
    try {
        if (await deleteTables() === 1) console.log("all tables have been deleted");
        else throw new Error("an error has occurred while deleting the tables")
        if (await createTables() === 1) console.log("all tables have been created");
        else throw new Error("an error has occurred while creating the tables")
        console.log("the database has been cleaned", "\n");
    } catch (err) {
        console.log("an error has occurred while cleaning the database");
    }
}

await clean();
process.exit();