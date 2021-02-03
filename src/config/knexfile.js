/**
 * Database configuration file for Knex/Postgres
 */
module.exports = {
    development: {
        client: "pg",
        connection: {
            host: "localhost",
            user: "postgres",
            password: "admin",
            database: "postgres",
        },
        migrations: { directory: "../../db/migrations" },
        seeds: { directory: "../../db/seeds" },
    },
    dev: {
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: "myapp",
        },
        migrations: { directory: "../../db/migrations" },
        seeds: { directory: "../../db/seeds" },
    },
    demo: {
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: "myapp",
        },
        migrations: { directory: "../../db/migrations" },
        seeds: { directory: "../../db/seeds" },
    },
    staging: {
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: "myapp",
        },
        migrations: { directory: "../../db/migrations" },
        seeds: { directory: "../../db/seeds" },
    },
    production: {
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: "myapp",
        },
        migrations: { directory: "../../db/migrations" },
        seeds: { directory: "../../db/seeds" },
    },
};
