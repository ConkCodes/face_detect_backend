import db from "../../index.js";

const createTables = async () => {
    try {
        // CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100) UNIQUE NOT NULL, entries BIGINT DEFAULT 0, joined TIMESTAMP NOT NULL);
        if (!(await db.schema.hasTable("users"))) {
            await db.schema.createTable("users", (table) => {
                table.increments("id").primary();
                table.string("name", 100);
                table.string("email", 100).unique().notNullable();
                table.bigInteger("entries").defaultTo(0);
                table.timestamp("joined").defaultTo(db.fn.now()).notNullable();
            });
        }
        // CREATE TABLE IF NOT EXISTS logins (id SERIAL PRIMARY KEY, email VARCHAR(100) UNIQUE NOT NULL, hash VARCHAR(100) NOT NULL);
        if (!(await db.schema.hasTable("logins"))) {
            await db.schema.createTable("logins", (table) => {
                table.increments("id").primary();
                table.string("email", 100).unique().notNullable();
                table.string("hash", 100).notNullable();
            });
        }
        // success
        return 1;
    // error
    } catch (err) {
        return -1;
    }
}

export default createTables;