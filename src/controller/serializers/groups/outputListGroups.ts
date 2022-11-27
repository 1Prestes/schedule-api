import { IOutputListGroups } from '@business/dto/groups/groupDto'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export type OutputListGroups = Either<IError, IOutputListGroups>
