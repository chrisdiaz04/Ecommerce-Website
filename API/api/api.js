import { Router } from 'express';
import { dbMethods } from '../databases/index.js';

const apiRouter = Router();

apiRouter.post('/user', async (req, res, next) => {

    try {
        const user = await dbMethods.users.createUser( 
            req.body);

        res.status(201).send({
            message: `User created successfully!`,
            user,
        });
    } catch (e) {
        next(e);
    }
});

export default apiRouter