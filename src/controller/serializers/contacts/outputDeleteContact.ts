import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputDeleteContact = Either<IError, boolean>
