import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputDeleteContactDto, OutputDeleteContactDto } from '@business/dto/contacts/contactsDto'
import { IContactRepository, IContactRepositoryToken } from '@business/repositories/contacts/iContactRepository'
import { ContactNotFound, FailedToDeleteContact } from '@business/module/errors/contacts/contacts'
import { left, right } from '@shared/either'

@injectable()
export class DeleteContactUseCase implements IUseCase<InputDeleteContactDto, OutputDeleteContactDto> {
  public constructor(@inject(IContactRepositoryToken) private contactRepository: IContactRepository) {}

  async exec(input: InputDeleteContactDto): Promise<OutputDeleteContactDto> {
    const deleteContactResponse = await this.contactRepository.deleteContactById(input)

    try {
      if (!deleteContactResponse) {
        return left(ContactNotFound)
      }

      return right(deleteContactResponse)
    } catch (error) {
      return left(FailedToDeleteContact)
    }
  }
}
