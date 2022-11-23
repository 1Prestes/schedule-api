import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputUpdateEventDto, OutputUpdateEventDto } from '@business/dto/events/eventsDto'
import { IEventRepository, IEventRepositoryToken } from '@business/repositories/events/iEventRepository'
import { FailedToUpdateEvent, InvalidEventDate } from '@business/module/errors/events/event'
import { HandleDate } from '../handle/handleDate'
import { left, right } from '@shared/either'

@injectable()
export class UpdateEventUseCase implements IUseCase<InputUpdateEventDto, OutputUpdateEventDto> {
  public constructor(@inject(IEventRepositoryToken) private eventRepository: IEventRepository) {}

  async exec(input: InputUpdateEventDto): Promise<OutputUpdateEventDto> {
    const handleDate = new HandleDate()
    const eventDateIsValid = handleDate.eventDateIsValid(input.initialDate, input.finalDate)

    if (!eventDateIsValid) {
      return left(InvalidEventDate)
    }

    try {
      const event = await this.eventRepository.update(input)

      return right(event)
    } catch (error) {
      console.log('UpdateEventUseCase::error => ', error)

      return left(FailedToUpdateEvent)
    }
  }
}
