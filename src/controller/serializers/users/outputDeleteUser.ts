import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputDeleteUser = Either<IError, boolean>
