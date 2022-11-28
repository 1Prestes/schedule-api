import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { EventNotFound, FailedToListContactsFromEvent } from '@business/module/errors/events/event'
import {
  InputListContactsFromEventDto,
  OutputListContactsFromEventDto,
} from '@business/dto/eventContacts/eventContacts'
import { IEventRepository, IEventRepositoryToken } from '@business/repositories/events/iEventRepository'
import { left, right } from '@shared/either'

@injectable()
export class ListContactsFromEventUseCase
  implements IUseCase<InputListContactsFromEventDto, OutputListContactsFromEventDto>
{
  public constructor(@inject(IEventRepositoryToken) private eventRepository: IEventRepository) {}

  async exec(input: InputListContactsFromEventDto): Promise<OutputListContactsFromEventDto> {
    try {
      const listContactsFromEventResponse = await this.eventRepository.listContactsFromEvent(input)

      if (!listContactsFromEventResponse) {
        return left(EventNotFound)
      }

      return right(listContactsFromEventResponse)
    } catch (error) {
      console.log('ListContactsFromEventUseCase::error => ', error)

      return left(FailedToListContactsFromEvent)
    }
  }
}
