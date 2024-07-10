import express from 'express';
import chalk from 'chalk';
import startDB from './index.js';
import apiRouter from '../api/api.js';
import cors from 'cors'

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
    console.log(chalk.cyan(`${req.method} ${req.path} @ ${new Date()}`));
    next();
});

app.use(cors ())

app.use('/api', apiRouter);

const startApp = async () => {
    try {
        await startDB(process.env.SEED ? true : false);
        app.listen(PORT, () => {
            console.log(chalk.green(`Server is now listening on PORT:${PORT}`));
        });
    } catch (e) {
        console.log(chalk.red(`Server failed to start.`));
        throw e;
    }
};

startApp();