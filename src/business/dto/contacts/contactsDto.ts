import { IContactEntity } from '@domain/entities/contacts/contactEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export interface InputCreateContactDto {
  name: string
  birthDate: Date
  address: string
  iduser: string
}

export type OutputCreateContactDto = Either<IError, IContactEntity>

export interface IOutputListContacts {
  rows: IContactEntity[]
  count: number
}

export interface InputListContactsDto {
  limit?: Number
  page?: Number
  iduser: string
}

export type OutputListContactsDto = Either<IError, IOutputListContacts>

export interface InputFindContactDto {
  id: string
}

export type OutputFindContactDto = Either<IError, IContactEntity>
