import { IUserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export interface InputCreateUserContactDto {
  email?: string
  phone?: string
  mainEmail?: boolean
  mainPhone?: boolean
  iduser?: string
  idcontact?: string
}

export type OutputCreateUserContactDto = Either<IError, IUserContactEntity>
