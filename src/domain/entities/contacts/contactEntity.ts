import { v4 as uuid } from 'uuid'

import { AbstractEntity } from '../abstractEntity'
import { Either, right } from '@shared/either'
import { IError } from '@shared/iError'

export interface IContactEntity {
  id?: string
  name: string
  birthDate: Date
  address: string
  iduser: string
  createdAt?: Date
}

export class ContactEntity extends AbstractEntity<IContactEntity> {
  static create(props: IContactEntity): Either<IError, ContactEntity> {
    const user = new ContactEntity({
      ...props,
      id: uuid(),
      createdAt: new Date(),
    })

    return right(user)
  }
}
