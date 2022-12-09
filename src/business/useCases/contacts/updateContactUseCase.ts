import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputUpdateContactDto, OutputUpdateContactDto } from '@business/dto/contacts/contactsDto'
import { IContactRepository, IContactRepositoryToken } from '@business/repositories/contacts/iContactRepository'
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { ContactNotFound, ContactUpdateFailed } from '@business/module/errors/contacts/contacts'
import { userNotFound } from '@business/module/errors/users/user'
import { left, right } from '@shared/either'

@injectable()
export class UpdateContactUseCase implements IUseCase<InputUpdateContactDto, OutputUpdateContactDto> {
  public constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IContactRepositoryToken) private contactRepository: IContactRepository
  ) {}

  async exec(input: InputUpdateContactDto): Promise<OutputUpdateContactDto> {
    try {
      const userResponse = await this.userRepository.findUserById(input.iduser)

      if (!userResponse) {
        return left(userNotFound)
      }

      const contactResponse = await this.contactRepository.findContactById(input.idcontact)

      if (!contactResponse) {
        return left(ContactNotFound)
      }

      const contactUpdated = await this.contactRepository.update(input)

      if (contactUpdated.valueOf()) {
        return right(true)
      }
    } catch (error) {
      console.log('UpdateContactUseCase::error => ', error)

      return left(ContactUpdateFailed)
    }
  }
}
