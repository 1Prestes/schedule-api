import { IEventEntity } from '@domain/entities/events/eventEntity'

export const IEventRepositoryToken = Symbol.for('IEventRepository')

export interface IEventRepository {
  create(eventEntity: IEventEntity): Promise<IEventEntity>
}
