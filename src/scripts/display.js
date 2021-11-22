import getTable from "../db/sql/core/getTable.js";

const displayDatabase = async () => {
    try {
        // attempt to display users table
        console.log("users table");
        const usersTable = await getTable("users");
        if (usersTable === -1) console.log("an error has occured trying to retrieve the users table");
        else if (usersTable === -2) console.log("the users table does not exist");
        else console.log(usersTable);
        console.log();
        // attempt to display logins table
        console.log("logins table");
        const loginsTable = await getTable("logins");
        if (loginsTable === -1) console.log("an error has occured trying to retrieve the logins table");
        else if (loginsTable === -2) console.log("the logins table does not exist");
        else console.log(loginsTable);
        console.log();
    } catch (err) {
        console.log("an error has occurred while viewing the database");
    } 
    console.log("finished");
}

await displayDatabase();
process.exit();