import { IOutputListUsers } from '@business/dto/users/userDto'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputListUsers = Either<IError, IOutputListUsers>
