import db from "../../index.js";

// DROP TABLE IF EXISTS users;
db.schema.dropTableIfExists("users");

// DROP TABLE IF EXISTS login;
db.schema.dropTableIfExists("login");