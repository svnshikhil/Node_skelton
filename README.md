
> **A SQL query builder that is _flexible_, _portable_, and _fun_ to use!**

A batteries-included, multi-dialect (MSSQL, MySQL, PostgreSQL, SQLite3, Oracle (including Oracle Wallet Authentication)) query builder for
Node.js, featuring:

- [transactions](https://knexjs.org/#Transactions)
- [connection pooling](https://knexjs.org/#Installation-pooling)
- [streaming queries](https://knexjs.org/#Interfaces-Streams)
- both a [promise](https://knexjs.org/#Interfaces-Promises) and [callback](https://knexjs.org/#Interfaces-Callbacks) API
- a [thorough test suite](https://github.com/knex/knex/actions)

---

## Application Structure

- `index.js` - The entry point to our application. This file defines our express server and connects it to postgres using ORM.
- `config/` - This folder contains configuration for ORM as well as a central location for configuration/environment variables.
- `models/` - This folder contains the schema definitions for our ORM models.
- `ctrl.js` - This file contains the business logic for each module.


## Scripts

- `db:migration:make` - To create a migration.
- `db:migration:run` - To run all migration.
- `db:seed:make` - To create a seed.
- `db:seed:run` - To run all seeds.

## Authentication
- Use Authorization header

## Edit a file

You’ll start by editing this README file to learn how to edit a file in Bitbucket.

1. Click **Source** on the left side.
2. Click the README.md link from the list of files.
3. Click the **Edit** button.
4. Delete the following text: *Delete this line to make a change to the README from Bitbucket.*
5. After making your change, click **Commit** and then **Commit** again in the dialog. The commit page will open and you’ll see the change you just made.
6. Go back to the **Source** page.

---