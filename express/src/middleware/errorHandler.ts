import { BusinessLogic } from '../util/BusinessLogicInterface';

export const errorHandler = (controller: BusinessLogic): BusinessLogic => {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};