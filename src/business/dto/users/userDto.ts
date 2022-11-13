import { IUserEntity } from '@domain/entities/users/userEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export interface InputCreateUserDto {
  name: string
  birthDate: Date
  address: string
  username: string
  password: string
}

export type OutputCreateUserDto = Either<IError, IUserEntity>

export interface InputFindUserDto {
  userId: string
}

export type OutputFindUserDto = Either<IError, IUserEntity>
