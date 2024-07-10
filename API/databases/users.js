import { client } from './db.js';

export const seedUsers = async () => {
    try {
        await client.query(`
            DROP TABLE IF EXISTS users;
            CREATE TABLE IF NOT EXISTS users (
                UserID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                FirstName VARCHAR(255) NOT NULL,
                LastName VARCHAR(255) NOT NULL,
                Phone VARCHAR(10) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                Username VARCHAR(10) NOT NULL,
                Password VARCHAR(255) NOT NULL,
                Status VARCHAR(255) NOT NULL
            );

            INSERT INTO users (FirstName,LastName,Phone,Email,Username,Password,Status)
            VALUES ('chris','Diaz','3214567807','chrisdiaz@yahoo.com','chrisdiaz','123456','Administrator');
        `);
    } catch (e) {
        throw e;
    }
};

export const createUser = async ({
                                     FirstName,
                                     LastName,
                                     Phone,
                                     Email,
                                     Username,
                                     Password,
                                     Status
                                 }) => {
    try {
        const { rows: createdUsers } = await client.query(`
            INSERT INTO 
                users (FirstName,LastName,Phone,Email,Username,Password, Status) 
            VALUES 
                ($1, $2, $3, $4, $5, $6, 'regular')
            RETURNING *;
        `, [FirstName,LastName,Phone,Email,Username,Password]);

        return createdUsers[0];
    } catch (e) {
        throw e;
    }
};

