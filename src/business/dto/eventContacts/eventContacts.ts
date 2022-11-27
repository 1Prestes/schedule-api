import { IEventContactResponse } from '@business/repositories/events/iEventRepository'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export interface InputAddContactToEventDto {
  idevent: string
  idcontact: string
  iduser: string
}

export type OutputAddContactToEventDto = Either<IError, IEventContactResponse>
