import { inject, injectable } from 'inversify'

import { IEventEntity } from '@domain/entities/events/eventEntity'
import { IAddContactToEventProps, IEventRepository } from '@business/repositories/events/iEventRepository'
import {
  InputDeleteEventDto,
  InputFindEventDto,
  InputListEventsDto,
  InputUpdateEventDto,
} from '@business/dto/events/eventsDto'
import { EventModel } from '@framework/models/event'
import { ContactModel } from '@framework/models/contact'
import { InputListContactsFromEventDto } from '@business/dto/eventContacts/eventContacts'

@injectable()
export class EventRepository implements IEventRepository {
  public constructor(
    @inject(EventModel) private eventModel: typeof EventModel,
    @inject(ContactModel) private contactModel: typeof ContactModel
  ) {}

  async create(eventEntity: IEventEntity): Promise<IEventEntity> {
    const createResponse = await this.eventModel.create({
      idevent: eventEntity.id,
      title: eventEntity.title,
      description: eventEntity.description,
      initial_date: eventEntity.initialDate,
      final_date: eventEntity.finalDate,
      place: eventEntity.place,
      iduser: eventEntity.iduser,
    })

    return createResponse.dataValues
  }

  async list(props: InputListEventsDto): Promise<{
    rows: EventModel[]
    count: number
  }> {
    return this.eventModel.findAndCountAll({
      ...(props?.limit && { limit: Number(props.limit) }),
      ...(props?.page && { offset: Number(props.page) }),
      where: { iduser: props.iduser },
    })
  }

  async deleteEventById(props: InputDeleteEventDto): Promise<boolean> {
    const where = {
      idevent: props.idevent,
      iduser: props.iduser,
    }
    const deleteResult = await this.eventModel.destroy({ where })

    return !!deleteResult
  }

  async update(props: InputUpdateEventDto): Promise<boolean> {
    const response = await this.eventModel.update(
      {
        title: props.title,
        description: props.description,
        initialDate: props.initialDate,
        finalDate: props.finalDate,
        place: props.place,
      },
      {
        where: {
          idevent: props.idevent,
          iduser: props.iduser,
        },
      }
    )

    if (response[0] === 1) {
      return true
    }

    return false
  }

  async findEventById(props: InputFindEventDto): Promise<IEventEntity> {
    return this.eventModel.findOne({
      where: {
        idevent: props.idevent,
        iduser: props.iduser,
      },
    })
  }

  async addContactToEvent(props: IAddContactToEventProps): Promise<IEventEntity> {
    const contactResponse = await this.contactModel.findByPk(props.idcontact)
    const eventResponse = await this.eventModel.findByPk(props.idevent)

    await eventResponse.addContact([contactResponse])

    const result = await this.eventModel.findOne({
      where: { idevent: props.idevent },
      include: ContactModel,
    })

    return result
  }

  async removeContactFromEvent(props: IAddContactToEventProps): Promise<boolean> {
    const contactResponse = await this.contactModel.findByPk(props.idcontact)
    const eventResponse = await this.eventModel.findByPk(props.idevent)

    await eventResponse.removeContact(contactResponse)

    await this.eventModel.findOne({
      where: { idevent: props.idevent },
      include: ContactModel,
    })

    return true
  }

  async listContactsFromEvent(props: InputListContactsFromEventDto): Promise<IEventEntity> {
    const response = await this.eventModel.findOne({
      where: { idevent: props.idevent, iduser: props.iduser },
      include: ContactModel,
    })

    return response
  }
}
