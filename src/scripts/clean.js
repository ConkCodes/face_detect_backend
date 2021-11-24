import deleteTables from "../db/knex/core/deleteTables.js";
import createTables from "../db/knex/core/createTables.js";

const clean = async () => {
    try {
        const deleteStatus = await deleteTables();
        if (deleteStatus === 1) console.log("all tables have been deleted");
        else throw new Error("an error has occurred while deleting the tables")
        const createStatus = await createTables();
        if (createStatus === 1) console.log("all tables have been created");
        else throw new Error("an error has occurred while creating the tables")
        console.log("the database has been cleaned", "\n");
    } catch (err) {
        console.log(err);
    }
}

await clean();
process.exit();