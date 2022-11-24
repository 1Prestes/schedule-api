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
