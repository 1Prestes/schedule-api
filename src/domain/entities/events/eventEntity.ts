import { v4 as uuid } from 'uuid'

import { AbstractEntity } from '../abstractEntity'
import { Either, right } from '@shared/either'
import { IError } from '@shared/iError'

export interface IEventEntity {
  id?: string
  title: string
  description: string
  initialDate: Date
  finalDate: Date
  place: string
  iduser: string
  createdAt?: Date
}

export class EventEntity extends AbstractEntity<IEventEntity> {
  static create(props: IEventEntity): Either<IError, EventEntity> {
    const user = new EventEntity({
      ...props,
      id: uuid(),
      createdAt: new Date(),
    })

    return right(user)
  }
}
