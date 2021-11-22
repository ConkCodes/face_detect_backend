import db from "../../index.js";

const deleteTables = async () => {
    try {
        // DROP TABLE IF EXISTS users;
        db.schema.hasTable("users").then(function(exists) {
            if (exists) {
                db.schema.dropTable("users");
            }
        });
        // DROP TABLE IF EXISTS login;
        db.schema.hasTable("login").then(function(exists) {
            if (exists) {
                db.schema.dropTable("login");
            }
        });
        // success
        console.log("all tables have been deleted");
    // error
    } catch (err) {
        console.log("an error has occurred while deleting the tables");
    }
}

export default deleteTables;