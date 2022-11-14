import { injectable, inject } from 'inversify'

import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { failedToDeleteUser, userNotFound } from '@business/module/errors/users/user'
import { InputDeleteUserDto, OutputDeleteUserDto } from '@business/dto/users/userDto'
import { IUseCase } from '../iUseCase'
import { left, right } from '@shared/either'

@injectable()
export class DeleteUserUseCase implements IUseCase<InputDeleteUserDto, OutputDeleteUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputDeleteUserDto): Promise<OutputDeleteUserDto> {
    const user = await this.userRepository.deleteUserById(input.id)

    try {
      if (!user) {
        return left(userNotFound)
      }

      return right(user)
    } catch (error) {
      return left(failedToDeleteUser)
    }
  }
}
