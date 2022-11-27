import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputRemoveContactFromEvent = Either<IError, boolean>
