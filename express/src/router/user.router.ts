import { Router } from 'express';
import { errorHandler } from '../middleware/errorHandler';
import { UserController } from '../controller/user.controller';

const router = Router();
export const userServiceRouter = (app: Router) => {
    const userController = new UserController();

    app.use('/users', router);

    router.post('/register', errorHandler(userController.signup));

    router.get('/id', errorHandler(userController.getUser));

    router.post('/auth', errorHandler(userController.signIn))
};