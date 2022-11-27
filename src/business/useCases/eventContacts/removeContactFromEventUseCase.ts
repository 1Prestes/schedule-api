import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import {
  InputRemoveContactFromEventDto,
  OutputRemoveContactFromEventDto,
} from '@business/dto/eventContacts/eventContacts'
import { IContactRepository, IContactRepositoryToken } from '@business/repositories/contacts/iContactRepository'
import { IEventRepository, IEventRepositoryToken } from '@business/repositories/events/iEventRepository'
import { ContactRemoveFailed, EventNotFound } from '@business/module/errors/events/event'
import { ContactNotFound } from '@business/module/errors/contacts/contacts'
import { left, right } from '@shared/either'

@injectable()
export class RemoveContactFromEventUseCase
  implements IUseCase<InputRemoveContactFromEventDto, OutputRemoveContactFromEventDto>
{
  public constructor(
    @inject(IEventRepositoryToken) private eventRepository: IEventRepository,
    @inject(IContactRepositoryToken) private contactRepository: IContactRepository
  ) {}

  async exec(input: InputRemoveContactFromEventDto): Promise<OutputRemoveContactFromEventDto> {
    try {
      const contactResult = await this.contactRepository.findContactById(input.idcontact)

      if (!contactResult) {
        return left(ContactNotFound)
      }

      const eventResult = await this.eventRepository.findEventById(input)

      if (!eventResult) {
        return left(EventNotFound)
      }

      const removeContactFromEventResponse = await this.eventRepository.removeContactFromEvent(input)

      return right(removeContactFromEventResponse)
    } catch (error) {
      console.log('RemoveContactFromEventUseCase::error => ', error)

      return left(ContactRemoveFailed)
    }
  }
}
