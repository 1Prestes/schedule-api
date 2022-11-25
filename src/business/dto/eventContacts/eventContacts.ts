import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export interface InputAddContactToEventDto {
  idevent: string
  idcontact: string
}

export type OutputAddContactToEventDto = Either<IError, boolean>
