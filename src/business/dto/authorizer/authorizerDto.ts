import { IUserEntity } from '@domain/entities/users/userEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export interface InputSignInDto {
  username: string
  password: string
}

export interface OutputUserSignIn extends IUserEntity {
  token: string
}

export type OutputSignInDto = Either<IError, OutputUserSignIn>
