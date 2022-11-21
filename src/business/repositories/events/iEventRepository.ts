import { IEventEntity } from '@domain/entities/events/eventEntity'

import { InputListEventsDto } from '@business/dto/events/eventsDto'

export const IEventRepositoryToken = Symbol.for('IEventRepository')

export interface IEventRepository {
  create(eventEntity: IEventEntity): Promise<IEventEntity>
  list({ iduser, limit, page }: InputListEventsDto): Promise<{ rows: IEventEntity[]; count: number }>
}
