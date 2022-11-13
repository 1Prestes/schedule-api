import { v4 as uuid } from 'uuid'

import { AbstractEntity } from '../abstractEntity'
import { Either, right } from '@shared/either'
import { IError } from '@shared/iError'

export interface IUserEntity {
  id?: string
  name: string
  username: string
  birthDate: Date
  password: string
  address: string
  createdAt?: Date
}

export class UserEntity extends AbstractEntity<IUserEntity> {
  static create(props: IUserEntity): Either<IError, UserEntity> {
    const user = new UserEntity({
      ...props,
      id: uuid(),
      createdAt: new Date(),
    })

    return right(user)
  }
}
