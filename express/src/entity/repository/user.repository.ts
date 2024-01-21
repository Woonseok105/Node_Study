import { userRepository } from '../../app';

export class UserRepository {
    public async findById(accountId: string) {
        return await userRepository.findOneBy({accountId: accountId})
    }
}