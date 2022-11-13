import { injectable, inject } from 'inversify'

import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { InputFindUserDto, OutputFindUserDto } from '@business/dto/users/userDto'
import { userNotExist } from '@business/module/errors/users/user'
import { IUseCase } from '../iUseCase'
import { left, right } from '@shared/either'

@injectable()
export class FindUserUseCase implements IUseCase<InputFindUserDto, OutputFindUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputFindUserDto): Promise<OutputFindUserDto> {
    const user = await this.userRepository.findUserById(input.id)

    if (!user) {
      return left(userNotExist)
    }

    return right(user)
  }
}
