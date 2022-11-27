import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputDeleteGroup = Either<IError, boolean>
