import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputAddContactToEventDto, OutputAddContactToEventDto } from '@business/dto/eventContacts/eventContacts'
import { IEventRepository, IEventRepositoryToken } from '@business/repositories/events/iEventRepository'
import { IContactRepository, IContactRepositoryToken } from '@business/repositories/contacts/iContactRepository'
import { EventCreationFailed, EventNotFound } from '@business/module/errors/events/event'
import { ContactNotFound } from '@business/module/errors/contacts/contacts'
import { left, right } from '@shared/either'

@injectable()
export class AddContactToEventUseCase implements IUseCase<InputAddContactToEventDto, OutputAddContactToEventDto> {
  public constructor(
    @inject(IEventRepositoryToken) private eventRepository: IEventRepository,
    @inject(IContactRepositoryToken) private contactRepository: IContactRepository
  ) {}

  async exec(input: InputAddContactToEventDto): Promise<OutputAddContactToEventDto> {
    try {
      const contactResult = await this.contactRepository.findContactById(input.idcontact)

      if (!contactResult) {
        return left(ContactNotFound)
      }

      const eventResult = await this.eventRepository.findEventById(input)

      if (!eventResult) {
        return left(EventNotFound)
      }

      const addContactToEventResponse = await this.eventRepository.addContactToEvent(input)

      return right(addContactToEventResponse)
    } catch (error) {
      console.log('AddContactToEventUseCase::error => ', error)

      return left(EventCreationFailed)
    }
  }
}
