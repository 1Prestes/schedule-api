import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputListContactsDto, OutputListContactsDto } from '@business/dto/contacts/contactsDto'
import { IContactRepository, IContactRepositoryToken } from '@business/repositories/contacts/iContactRepository'
import { FailureOnGetContacts } from '@business/module/errors/contacts/contacts'
import { left, right } from '@shared/either'

@injectable()
export class ListContactsUseCase implements IUseCase<InputListContactsDto, OutputListContactsDto> {
  public constructor(@inject(IContactRepositoryToken) private contactRepository: IContactRepository) {}

  async exec(input: InputListContactsDto): Promise<OutputListContactsDto> {
    try {
      const user = await this.contactRepository.list(input)
      console.log('ListContactsUseCase::input => ', input)

      return right(user)
    } catch (error) {
      console.log('ListContactsUseCase::error => ', error)

      return left(FailureOnGetContacts)
    }
  }
}
