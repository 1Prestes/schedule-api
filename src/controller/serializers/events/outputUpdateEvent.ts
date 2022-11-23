import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputUpdateEvent = Either<IError, boolean>
