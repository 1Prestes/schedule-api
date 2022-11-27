import { v4 as uuid } from 'uuid'

import { AbstractEntity } from '../abstractEntity'
import { Either, right } from '@shared/either'
import { IError } from '@shared/iError'

export interface IUserContactEntity {
  id?: string
  email?: string
  phone?: string
  primaryEmail?: boolean
  primaryPhone?: boolean
  iduser?: string
  idcontact?: string
  createdAt?: Date
}

export class UserContactEntity extends AbstractEntity<IUserContactEntity> {
  static create(props: IUserContactEntity): Either<IError, UserContactEntity> {
    const user = new UserContactEntity({
      ...props,
      id: uuid(),
      createdAt: new Date(),
    })

    return right(user)
  }
}
