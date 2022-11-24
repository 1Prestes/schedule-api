import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputFindContactDto, OutputFindContactDto } from '@business/dto/contacts/contactsDto'
import { IContactRepository, IContactRepositoryToken } from '@business/repositories/contacts/iContactRepository'
import { ContactNotFound, FailureOnGetContact } from '@business/module/errors/contacts/contacts'
import { left, right } from '@shared/either'

@injectable()
export class FindContactUseCase implements IUseCase<InputFindContactDto, OutputFindContactDto> {
  public constructor(@inject(IContactRepositoryToken) private contactRepository: IContactRepository) {}

  async exec(input: InputFindContactDto): Promise<OutputFindContactDto> {
    const contactResponse = await this.contactRepository.findContactById(input.id)

    if (!contactResponse) {
      return left(ContactNotFound)
    }

    try {
      return right(contactResponse)
    } catch (error) {
      return left(FailureOnGetContact)
    }
  }
}
