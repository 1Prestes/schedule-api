import { IGroupEntity } from '@domain/entities/groups/groupEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputAddContactToGroup = Either<IError, IGroupEntity>
