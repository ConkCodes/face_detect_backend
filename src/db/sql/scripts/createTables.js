import db from "../../index.js";

// CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100) UNIQUE NOT NULL, entries BIGINT DEFAULT 0, joined TIMESTAMP NOT NULL);
db.schema.createTableIfNotExists("users", function (table) {
    table.increments("id").primary();
    table.string("name", 100);
    table.string("email", 100).unique().notNullable();
    table.bigInteger("entries").defaultTo(0);
    table.timestamp("joined").defaultTo(db.fn.now()).notNullable();
});

// CREATE TABLE IF NOT EXISTS login (id SERIAL PRIMARY KEY, email VARCHAR(100) UNIQUE NOT NULL, hash VARCHAR(100) NOT NULL);
db.schema.createTableIfNotExists("users", function (table) {
    table.increments("id").primary();
    table.string("email", 100).unique().notNullable();
    table.string("hash", 100).notNullable();
});

