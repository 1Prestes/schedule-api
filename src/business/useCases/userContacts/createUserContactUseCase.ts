import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { UserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { InputUserContactDto, OutputUserContactDto } from '@business/dto/userContacts/userContactDto'
import { EmailIsNotAvailable, UserContactCreationFailed } from '@business/module/errors/userContacts/userContacts'
import {
  IUserContactRepository,
  IUserContactRepositoryToken,
} from '@business/repositories/userContacts/iUserContactRepository'
import { left, right } from '@shared/either'
import { HandleUserContact } from '../handle/handleUserContact'
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { userNotFound } from '@business/module/errors/users/user'

@injectable()
export class CreateUserContactUseCase implements IUseCase<InputUserContactDto, OutputUserContactDto> {
  public constructor(
    @inject(IUserContactRepositoryToken) private userContactRepository: IUserContactRepository,
    @inject(IUserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async exec(input: InputUserContactDto): Promise<OutputUserContactDto> {
    const handleUserContact = new HandleUserContact()

    const hasOwner = handleUserContact.hasOwner(input)
    if (hasOwner.isLeft()) return left(hasOwner.value)

    const hasContact = handleUserContact.hasContact(input)
    if (hasContact.isLeft()) return left(hasContact.value)

    const hasPrimaryContact = handleUserContact.hasPrimaryContact(input)
    if (hasPrimaryContact.isLeft()) return left(hasPrimaryContact.value)

    const userContactResult = UserContactEntity.create(input)

    if (userContactResult.isLeft()) {
      return left(UserContactCreationFailed)
    }

    try {
      if (input.iduser) {
        const userResponse = await this.userRepository.findUserById(input.iduser)

        if (!userResponse) {
          return left(userNotFound)
        }
      }

      const userContactResponse = await this.userContactRepository.create(userContactResult.value.export())

      if (userContactResponse === 'unique violation') {
        return left(EmailIsNotAvailable)
      }

      return right(userContactResponse)
    } catch (error) {
      console.log('CreateUserContactUseCase::error => ', error)
      return left(UserContactCreationFailed)
    }
  }
}
