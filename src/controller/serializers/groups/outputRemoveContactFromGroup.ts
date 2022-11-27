import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputRemoveContactFromGroup = Either<IError, boolean>
