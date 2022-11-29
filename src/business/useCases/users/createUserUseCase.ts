import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { UserEntity } from '@domain/entities/users/userEntity'
import { UserCreationFailed, UsernameIsAlreadyInUse } from '@business/module/errors/users/user'
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { InputCreateUserDto, OutputCreateUserDto } from '@business/dto/users/userDto'
import { HandlePassword } from '../handle/handlePassword'
import { left, right } from '@shared/either'

@injectable()
export class CreateUserUseCase implements IUseCase<InputCreateUserDto, OutputCreateUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    const handlePassword = new HandlePassword()
    const hashedPassword = handlePassword.hashPassword(input.password)

    try {
      const userResponse = await this.userRepository.getUserByUsername(input.username)

      if (userResponse) {
        return left(UsernameIsAlreadyInUse)
      }

      const userResult = UserEntity.create({
        name: input.name,
        username: input.username,
        password: hashedPassword,
        birthDate: input.birthDate,
        address: input.address,
      })

      if (userResult.isLeft()) {
        return left(UserCreationFailed)
      }

      const user = await this.userRepository.create(userResult.value.export())

      return right(user)
    } catch (error) {
      console.log('CreateUserUseCase::error => ', error)

      return left(UserCreationFailed)
    }
  }
}
