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
  id: string
}

export type OutputFindUserDto = Either<IError, IUserEntity>

export interface InputListUsersDto {
  limit?: Number
  page?: Number
}

export interface IOutputListUsers {
  rows: IUserEntity[]
  count: number
}

export type OutputListUsersDto = Either<IError, IOutputListUsers>

export interface InputUpdateUserDto {
  id: string
  name?: string
  birthDate?: Date
  address?: string
  password?: string
  confirmPassword?: string
}

export type OutputUpdateUserDto = Either<IError, boolean>

export interface InputDeleteUserDto {
  id: string
}

export type OutputDeleteUserDto = Either<IError, boolean>
