import { Router } from 'express';
import { userServiceRouter } from './user.router';

export const expressRouter = () => {
    const app = Router();

    userServiceRouter(app);
    return app
};