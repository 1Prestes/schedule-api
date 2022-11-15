import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { UserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { InputCreateUserContactDto, OutputCreateUserContactDto } from '@business/dto/userContacts/userContactDto'
import {
  AtLeastOnContactMustBeInformed,
  EmailIsNotAvailable,
  PrimaryEmailNotInformed,
  PrimaryPhoneNotInformed,
  UserContactCreationFailed,
  UserContactUnassociated,
} from '@business/module/errors/userContacts/userContacts'
import {
  IUserContactRepository,
  IUserContactRepositoryToken,
} from '@business/repositories/userContacts/iUserContactRepository'
import { left, right } from '@shared/either'

@injectable()
export class CreateUserContactUseCase implements IUseCase<InputCreateUserContactDto, OutputCreateUserContactDto> {
  public constructor(@inject(IUserContactRepositoryToken) private userContactRepository: IUserContactRepository) {}

  async exec(input: InputCreateUserContactDto): Promise<OutputCreateUserContactDto> {
    if (!input.idcontact && !input.iduser) {
      return left(UserContactUnassociated)
    }

    if (!input.email && !input.phone) {
      return left(AtLeastOnContactMustBeInformed)
    }

    if (input.mainEmail && !input.email) {
      return left(PrimaryEmailNotInformed)
    }

    if (input.mainPhone && !input.phone) {
      return left(PrimaryPhoneNotInformed)
    }

    const userContactResult = UserContactEntity.create(input)

    if (userContactResult.isLeft()) {
      return left(UserContactCreationFailed)
    }

    try {
      const userResponse = await this.userContactRepository.create(userContactResult.value.export())

      if (userResponse === 'unique violation') {
        return left(EmailIsNotAvailable)
      }

      return right(userResponse)
    } catch (error) {
      console.log('CreateUserContactUseCase::error => ', error)
      return left(UserContactCreationFailed)
    }
  }
}
