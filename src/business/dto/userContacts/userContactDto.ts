import { IUserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export interface InputUserContactDto {
  id?: string
  email?: string
  phone?: string
  mainEmail?: boolean
  mainPhone?: boolean
  iduser?: string
  idcontact?: string
}

export type OutputUserContactDto = Either<IError, IUserContactEntity>
export type OutputUpdateUserContactDto = Either<IError, boolean>
