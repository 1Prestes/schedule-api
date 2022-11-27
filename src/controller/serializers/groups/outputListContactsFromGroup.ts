import { IGroupEntity } from '@domain/entities/groups/groupEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputListContactsFromGroup = Either<IError, IGroupEntity>
