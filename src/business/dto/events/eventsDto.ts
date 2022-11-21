import { IEventEntity } from '@domain/entities/events/eventEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export interface InputCreateEventDto {
  title: string
  description: string
  initialDate: Date
  finalDate: Date
  place: string
  iduser: string
}

export type OutputCreateEventDto = Either<IError, IEventEntity>
