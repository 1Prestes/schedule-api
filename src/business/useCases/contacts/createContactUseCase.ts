import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { ContactEntity } from '@domain/entities/contacts/contactEntity'
import { InputCreateContactDto, OutputCreateContactDto } from '@business/dto/contacts/contactsDto'
import { IContactRepository, IContactRepositoryToken } from '@business/repositories/contacts/iContactRepository'
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { ContactCreationFailed } from '@business/module/errors/contacts/contacts'
import { left, right } from '@shared/either'
import { userNotFound } from '@business/module/errors/users/user'

@injectable()
export class CreateContactUseCase implements IUseCase<InputCreateContactDto, OutputCreateContactDto> {
  public constructor(
    @inject(IContactRepositoryToken) private contactRepository: IContactRepository,
    @inject(IUserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async exec(input: InputCreateContactDto): Promise<OutputCreateContactDto> {
    const userResponse = await this.userRepository.findUserById(input.iduser)

    if (!userResponse) {
      return left(userNotFound)
    }

    const contactResult = ContactEntity.create({
      name: input.name,
      birthDate: input.birthDate,
      address: input.address,
      iduser: input.iduser,
    })

    if (contactResult.isLeft()) {
      return left(ContactCreationFailed)
    }

    try {
      const contactResponse = await this.contactRepository.create(contactResult.value.export())

      return right(contactResponse)
    } catch (error) {
      console.log('CreateContactUseCase::error => ', error)
      return left(ContactCreationFailed)
    }
  }
}
