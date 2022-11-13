import { IUserEntity } from '@domain/entities/users/userEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputFindUser = Either<IError, IUserEntity>
