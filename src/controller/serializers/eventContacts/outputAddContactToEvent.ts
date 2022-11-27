import { IEventEntity } from '@domain/entities/events/eventEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputAddContactToEvent = Either<IError, IEventEntity>