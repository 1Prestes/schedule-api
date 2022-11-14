import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { failureOnGetUsers } from '@business/module/errors/users/user'
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { InputListUsersDto, OutputListUsersDto } from '@business/dto/users/userDto'
import { left, right } from '@shared/either'

@injectable()
export class ListUsersUseCase implements IUseCase<InputListUsersDto, OutputListUsersDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputListUsersDto): Promise<OutputListUsersDto> {
    try {
      const user = await this.userRepository.list(input)
      console.log('ListUsersUseCase::input => ', input)

      return right(user)
    } catch (error) {
      console.log('DEU RUIM => ', error)
      return left(failureOnGetUsers)
    }
  }
}
