import { IEventEntity } from '@domain/entities/events/eventEntity'

import { InputDeleteEventDto, InputListEventsDto, InputUpdateEventDto } from '@business/dto/events/eventsDto'

export const IEventRepositoryToken = Symbol.for('IEventRepository')

export interface IEventRepository {
  create(eventEntity: IEventEntity): Promise<IEventEntity>
  list({ iduser, limit, page }: InputListEventsDto): Promise<{ rows: IEventEntity[]; count: number }>
  deleteEventById(props: InputDeleteEventDto): Promise<boolean>
  update(props: InputUpdateEventDto): Promise<boolean>
}
