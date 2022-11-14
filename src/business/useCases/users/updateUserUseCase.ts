import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { UserCreationFailed } from '@business/module/errors/users/user'
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { InputUpdateUserDto, OutputUpdateUserDto } from '@business/dto/users/userDto'
import { HandlePassword } from '../handle/handlePassword'
import { left, right } from '@shared/either'

@injectable()
export class UpdateUserUseCase implements IUseCase<InputUpdateUserDto, OutputUpdateUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputUpdateUserDto): Promise<OutputUpdateUserDto> {
    try {
      const handlePassword = new HandlePassword()
      let hashedPassword

      if (input.password) {
        hashedPassword = handlePassword.hashPassword(input.password)
      }

      const userResponse = await this.userRepository.update({
        id: input.id,
        name: input.name,
        ...(hashedPassword && { password: hashedPassword }),
        birthDate: input.birthDate,
        address: input.address,
      })

      if (userResponse.valueOf()) {
        return right(true)
      }
    } catch (error) {
      console.log('DEU RUIM => ', error)
      return left(UserCreationFailed)
    }
  }
}
