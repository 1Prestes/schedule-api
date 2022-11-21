import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputDeleteEvent = Either<IError, boolean>
