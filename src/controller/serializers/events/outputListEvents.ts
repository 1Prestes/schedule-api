import { IOutputListEvents } from '@business/dto/events/eventsDto'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputListEvents = Either<IError, IOutputListEvents>
