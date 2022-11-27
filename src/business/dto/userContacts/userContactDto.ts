import { IUserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export interface InputUserContactDto {
  id?: string
  email?: string
  phone?: string
  primaryEmail?: boolean
  primaryPhone?: boolean
  iduser?: string
  idcontact?: string
}

export type OutputUserContactDto = Either<IError, IUserContactEntity>
export type OutputUpdateUserContactDto = Either<IError, boolean>

export enum WhereListUserContactsProps {
  iduserContact = 'iduser_contact',
  email = 'email',
  phone = 'phone',
  primaryEmail = 'primary_email',
  primaryPhone = 'primary_phone',
}

export interface InputListUserContactsDto {
  id: string
  limit?: Number
  page?: Number
  isOwner: boolean
  where?: string
  like?: string
}

export interface IOutputListUserContacts {
  rows: IUserContactEntity[]
  count: number
}

export type OutputListUserContactsDto = Either<IError, IOutputListUserContacts>

export interface InputDeleteUserContactDto {
  id: string
}

export type OutputDeleteUserContactDto = Either<IError, boolean>
