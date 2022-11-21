import { inject, injectable } from 'inversify'

import { IEventRepository } from '@business/repositories/events/iEventRepository'
import { EventModel } from '@framework/models/eventModel'
import { IEventEntity } from '@domain/entities/events/eventEntity'
import { InputListEventsDto } from '@business/dto/events/eventsDto'

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
}
