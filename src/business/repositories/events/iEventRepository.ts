import { IEventEntity } from '@domain/entities/events/eventEntity'
import {
  InputDeleteEventDto,
  InputFindEventDto,
  InputListEventsDto,
  InputUpdateEventDto,
} from '@business/dto/events/eventsDto'
import { InputListContactsFromEventDto } from '@business/dto/eventContacts/eventContacts'

export const IEventRepositoryToken = Symbol.for('IEventRepository')

export interface IAddContactToEventProps {
  idevent: string
  idcontact: string
  iduser: string
}

export interface IEventRepository {
  create(eventEntity: IEventEntity): Promise<IEventEntity>
  list({ iduser, limit, page }: InputListEventsDto): Promise<{ rows: IEventEntity[]; count: number }>
  deleteEventById(props: InputDeleteEventDto): Promise<boolean>
  update(props: InputUpdateEventDto): Promise<boolean>
  findEventById(props: InputFindEventDto): Promise<IEventEntity>
  addContactToEvent(props: IAddContactToEventProps): Promise<IEventEntity>
  removeContactFromEvent(props: IAddContactToEventProps): Promise<boolean>
  listContactsFromEvent(props: InputListContactsFromEventDto): Promise<IEventEntity>
}
