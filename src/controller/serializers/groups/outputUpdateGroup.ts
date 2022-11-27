import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputUpdateGroup = Either<IError, boolean>
