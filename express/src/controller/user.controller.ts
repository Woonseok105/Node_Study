import { BusinessLogic } from '../shared/BusinessLogicInterface';
import { UserService } from '../service/user.service';
import { UserRepository } from '../entity/repository/user.repository';

export class UserController {
    private userService = new UserService(
        new UserRepository
    );

    public signup: BusinessLogic = async (req, res, next) => {
        await this.userService.signup(req.body.accountId, req.body.password, req.body.name);
        res.status(201).json();
    };

    public getUser: BusinessLogic = async (req, res, next) => {
        const response = await this.userService.getUserId(req.body.accountId);
        res.status(200).json(response);
    };
}