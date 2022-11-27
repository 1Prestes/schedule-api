import { v4 as uuid } from 'uuid'

import { AbstractEntity } from '../abstractEntity'
import { Either, right } from '@shared/either'
import { IError } from '@shared/iError'

export interface IGroupEntity {
  id?: string
  title: string
  iduser: string
  createdAt?: Date
}

export class GroupEntity extends AbstractEntity<IGroupEntity> {
  static create(props: IGroupEntity): Either<IError, GroupEntity> {
    const user = new GroupEntity({
      ...props,
      id: uuid(),
      createdAt: new Date(),
    })

    return right(user)
  }
}
