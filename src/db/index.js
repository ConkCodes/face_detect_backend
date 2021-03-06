import knex from "knex";

const db = knex({
    client: "pg",
    connection: {
        host : process.env.PGHOST,
        port : process.env.PGPORT,
        user : process.env.PGUSER,
        password : process.env.PGPASSWORD,
        database : process.env.PGDATABASE
    }
});

export default db;