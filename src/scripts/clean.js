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



db.schema.createTable('users', function (table) {
    table.increments();
    table.string('name');
    table.timestamps();
});

// create table `users` (`id` int unsigned not null auto_increment primary key, `name` varchar(255), `created_at` datetime, `updated_at` datetime)

