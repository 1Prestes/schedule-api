import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { left, right } from '@shared/either'
import { InputSignInDto, OutputSignInDto, OutputUserSignIn } from '@business/dto/authorizer/authorizerDto'
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { InvalidCredentials, SignInFailure } from '@business/module/errors/authorizer/authorizer'
import { HandlePassword } from '../handle/handlePassword'
import { HandleJWT } from '../handle/handleJWT'

@injectable()
export class SignInUseCase implements IUseCase<InputSignInDto, OutputSignInDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputSignInDto): Promise<OutputSignInDto> {
    try {
      const handleJWT = new HandleJWT()
      const handlePassword = new HandlePassword()
      const userResponse = await this.userRepository.getUserByUsername(input.username)

      if (!userResponse) {
        return left(InvalidCredentials)
      }

      const passwordIsEqual = handlePassword.compare({
        plaintextPassword: input.password,
        hash: userResponse.password,
      })

      if (!passwordIsEqual) {
        return left(InvalidCredentials)
      }

      const token = handleJWT.generateToken(userResponse?.iduser)
      const user: OutputUserSignIn = {
        iduser: userResponse.iduser,
        name: userResponse.name,
        username: userResponse.username,
        // eslint-disable-next-line dot-notation
        birthDate: userResponse['birth_date'],
        address: userResponse.address,
        createdAt: userResponse.createdAt,
        updatedAt: userResponse.updatedAt,
        token: token,
      }

      return right(user)
    } catch (error) {
      console.log('SignInUseCase::error => ', error)

      return left(SignInFailure)
    }
  }
}
