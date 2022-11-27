import { IGroupEntity } from '@domain/entities/groups/groupEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export interface InputCreateGroupDto {
  title: string
  iduser: string
}

export type OutputCreateGroupDto = Either<IError, IGroupEntity>
