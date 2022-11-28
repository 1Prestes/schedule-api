import { IEventEntity } from '@domain/entities/events/eventEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export interface InputAddContactToEventDto {
  idevent: string
  idcontact: string
  iduser: string
}

export type OutputAddContactToEventDto = Either<IError, IEventEntity>

export interface InputRemoveContactFromEventDto {
  idevent: string
  idcontact: string
  iduser: string
}

export type OutputRemoveContactFromEventDto = Either<IError, boolean>

export interface InputListContactsFromEventDto {
  idevent: string
  iduser: string
}

export type OutputListContactsFromEventDto = Either<IError, IEventEntity>
