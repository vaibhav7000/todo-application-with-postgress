import { Client } from "pg";

const client = new Client({
    connectionString: process.env.psql,
})

export default async function connectionWithPG(): Promise<void> {

    try {
        const connection = await client.connect();
        console.log("connection with postgres is success");
        console.log(connection);

        try {
            await createUsersTable();

            try {
                await createTodoTable();
            } catch(error) {
                throw error;
            }
        } catch (error) {
            throw error
        }

    } catch (error) {
        throw error;
    }
};


// defining users table using pg client
async function createUsersTable(): Promise<void> {
    const query: string = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) UNIQUE NOT NULL CHECK(char_length(password) >= 8)
    );`

    try {
        const result = await client.query(query);
        console.log("user table created");

        return undefined;
    } catch (error) {
        console.log("error occured when creating the user table")
        throw error
    }
};

async function createTodoTable(): Promise<void> {
    const query: string = `CREATE TABLE IF NOT EXISTS todos (
        user_id INTEGER NOT NULL,
        id SERIAL PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        description VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT true,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
    );`;

    try {
        const result = await client.query(query);

        console.log("todo table is successfully created");
    } catch(error) {
        console.log("error occured when creating todos table");
        throw error;
    }
}



/*

    "VARCHAR(n)" type mean variable characters but with max limit of  => if VARCHAR(10) the string can be of max 10, but if 5 => space of 5 will be provided

    "TEXT" type in Postgres means VARCHAR but with no max limit => takes space according to the input

    "CHAR(n)" => fixed length even tough the string is not of n units but it will take n space

*/

