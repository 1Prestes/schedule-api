import { inject, injectable } from 'inversify'

import { IEventRepository } from '@business/repositories/events/iEventRepository'
import { EventModel } from '@framework/models/eventModel'
import { IEventEntity } from '@domain/entities/events/eventEntity'
import {
  InputDeleteEventDto,
  InputFindEventDto,
  InputListEventsDto,
  InputUpdateEventDto,
} from '@business/dto/events/eventsDto'

@injectable()
export class EventRepository implements IEventRepository {
  public constructor(@inject(EventModel) private eventModel: typeof EventModel) {}

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
}
