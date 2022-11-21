import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { IEventRepository, IEventRepositoryToken } from '@business/repositories/events/iEventRepository'
import { InputDeleteEventDto, OutputDeleteEventDto } from '@business/dto/events/eventsDto'
import { EventNotFound, FailedToDeleteEvent } from '@business/module/errors/events/event'
import { left, right } from '@shared/either'

@injectable()
export class DeleteEventUseCase implements IUseCase<InputDeleteEventDto, OutputDeleteEventDto> {
  public constructor(@inject(IEventRepositoryToken) private eventRepository: IEventRepository) {}

  async exec(input: InputDeleteEventDto): Promise<OutputDeleteEventDto> {
    const eventResponse = await this.eventRepository.deleteEventById(input)

    try {
      if (!eventResponse) {
        return left(EventNotFound)
      }

      return right(eventResponse)
    } catch (error) {
      return left(FailedToDeleteEvent)
    }
  }
}
