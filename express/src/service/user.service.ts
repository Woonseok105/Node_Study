import { userRepository } from '../app';
import { ConflictException } from '../exception/exception';

export class UserService {
    public async signup(accountId: string, password: string, name: string) {
        if (await userRepository.exists({ where: { accountId: accountId } }))
            throw new ConflictException('User Already Exist');

        await userRepository.save({
            accountId: accountId,
            password: password,
            name: name
        });
    };
}