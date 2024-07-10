import chalk from 'chalk';
import { client, connectDB } from './db.js';
import {seedUsers, createUser} from "./users.js";

const startDB = async (seed = false) => {
    try {
        await connectDB();

        if (seed) {
            await client.query(`
                DROP TABLE IF EXISTS users;
            `);

            await seedUsers();

            console.log(chalk.green(`Seeded successfully.`));
        }

        return client;
    } catch (e) {
        console.log(chalk.red(`Failed to seed and/or start database.`));
        throw e;
    }
}

export const dbMethods = {
    users: {
        createUser
    }
};

export default startDB;