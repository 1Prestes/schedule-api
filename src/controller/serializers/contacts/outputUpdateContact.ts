import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputUpdateContact = Either<IError, boolean>
