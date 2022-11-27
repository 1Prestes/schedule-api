import { IGroupEntity } from '@domain/entities/groups/groupEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export interface InputCreateGroupDto {
  title: string
  iduser: string
}

export type OutputCreateGroupDto = Either<IError, IGroupEntity>

export interface IOutputListGroups {
  rows: IGroupEntity[]
  count: number
}

export interface InputListGroupsDto {
  limit?: Number
  page?: Number
  iduser: string
}

export type OutputListGroupsDto = Either<IError, IOutputListGroups>
