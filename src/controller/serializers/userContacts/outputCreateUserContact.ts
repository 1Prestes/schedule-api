import { IUserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputCreateUserContact = Either<IError, IUserContactEntity>
