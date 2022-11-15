import { IUserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export interface InputCreateUserContactDto {
  email?: string
  phone?: string
  main_email?: boolean
  main_phone?: boolean
  user_iduser: string
}

export type OutputCreateUserContactDto = Either<IError, IUserContactEntity>
