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

export interface IOutputListEvents {
  rows: IEventEntity[]
  count: number
}

export interface InputListEventsDto {
  iduser: string
  limit?: Number
  page?: Number
}

export type OutputListEventsDto = Either<IError, IOutputListEvents>
