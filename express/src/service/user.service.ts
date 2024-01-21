import { userRepository } from '../app';
import { ConflictException } from '../exception/exception';
import { UserResponse } from '../controller/dto/user.response';
import { UserRepository } from '../entity/repository/user.repository';

export class UserService {
    constructor(
        private userRepository: UserRepository
    ) {
    }

    public async signup(accountId: string, password: string, name: string) {
        if (await userRepository.exists({ where: { accountId: accountId } }))
            throw new ConflictException('User Already Exist');

        await userRepository.save({
            accountId: accountId,
            password: password,
            name: name
        });
    };

    public async getUserId(accountId: string): Promise<UserResponse> {
        const user = await this.userRepository.findById(accountId);
        return {
            id: user.id,
            accountId: user.accountId,
            name: user.name
        };
    }
}