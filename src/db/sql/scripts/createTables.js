import db from "../../index.js";

const createTables = async () => {
    try {
        // CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100) UNIQUE NOT NULL, entries BIGINT DEFAULT 0, joined TIMESTAMP NOT NULL);
        db.schema.hasTable("users").then(function(exists) {
            if (!exists) {
                return db.schema.createTable("users", function(table) {
                    table.increments("id").primary();
                    table.string("name", 100);
                    table.string("email", 100).unique().notNullable();
                    table.bigInteger("entries").defaultTo(0);
                    table.timestamp("joined").defaultTo(db.fn.now()).notNullable();
                });
            }
        });
        // CREATE TABLE IF NOT EXISTS login (id SERIAL PRIMARY KEY, email VARCHAR(100) UNIQUE NOT NULL, hash VARCHAR(100) NOT NULL);
        db.schema.hasTable("login").then(function(exists) {
            if (!exists) {
                return db.schema.createTable("login", function(table) {
                    table.increments("id").primary();
                    table.string("email", 100).unique().notNullable();
                    table.string("hash", 100).notNullable();
                });
            }
        });
        // success
        console.log("all tables have been created");
    // error
    } catch (err) {
        console.log("an error has occurred while creating the tables");
    }
}

export default createTables;