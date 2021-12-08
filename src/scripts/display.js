import getTable from "../db/knex/core/getTable.js";

const display = async () => {
    try {
        console.log("displaying the first 10 records from each table...", "\n");
        // attempt to display users table
        console.log("users table");
        const usersTable = await getTable("users");
        if (usersTable === -1) console.log("an error has occured trying to retrieve the users table");
        else if (usersTable === -2) console.log("the users table does not exist", "\n");
        else console.log(usersTable, "\n");
        // attempt to display logins table
        console.log("logins table");
        const loginsTable = await getTable("logins");
        if (loginsTable === -1) console.log("an error has occured trying to retrieve the logins table");
        else if (loginsTable === -2) console.log("the logins table does not exist", "\n");
        else console.log(loginsTable, "\n");
    } catch (err) {
        console.log("an error has occurred while viewing the database", "\n");
    } 
    console.log("finished");
}

await display();
process.exit();