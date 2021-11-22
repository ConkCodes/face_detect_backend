import db from "../db/index.js";

const clean = async () => {
    // DROP TABLE IF EXISTS users;
    //let exists = await db.schema.hasTable("users");
    await db.schema.dropTable("users");
    db.schema.hasTable("users").then(exists => {
        if (exists) {
            console.log("triggered");
            db.schema.dropTable("users");
        }
    });
    /*
    if (exists) {
        console.log("triggered");
        await db.schema.dropTable("users");
    }
    */
    // DROP TABLE IF EXISTS login;
    if (await db.schema.hasTable("login")) db.schema.dropTable("login");
    // CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100) UNIQUE NOT NULL, entries BIGINT DEFAULT 0, joined TIMESTAMP NOT NULL);
    if (!(await db.schema.hasTable("users"))) {
        const usersTable = await db.schema.createTable("users");
        usersTable.increments("id").primary();
        usersTable.string("name", 100);
        usersTable.string("email", 100).unique().notNullable();
        usersTable.bigInteger("entries").defaultTo(0);
        usersTable.timestamp("joined").defaultTo(db.fn.now()).notNullable();
    }
    // CREATE TABLE IF NOT EXISTS login (id SERIAL PRIMARY KEY, email VARCHAR(100) UNIQUE NOT NULL, hash VARCHAR(100) NOT NULL);
    if (!(await db.schema.hasTable("login"))) {
        const loginTable = await db.schema.createTable("login");
        loginTable.increments("id").primary();
        loginTable.string("email", 100).unique().notNullable();
        loginTable.string("hash", 100).notNullable();
    }
}

clean();
console.log("the database has been cleaned");
process.exit();