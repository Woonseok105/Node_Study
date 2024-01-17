import { BusinessLogic } from '../shared/BusinessLogicInterface';
import { UserService } from '../service/user.service';

export class UserController {
    private userService = new UserService();

    public signup: BusinessLogic = async (req, res, next) => {
        await this.userService.signup(req.body.accountId, req.body.password, req.body.name);
        res.status(201).json();
    };
}