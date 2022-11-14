import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputUpdateUser = Either<IError, boolean>
