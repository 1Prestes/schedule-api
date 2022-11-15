import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { UserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { InputCreateUserContactDto, OutputCreateUserContactDto } from '@business/dto/userContacts/userContactDto'
import { UserContactCreationFailed } from '@business/module/errors/userContacts/userContacts'
import {
  IUserContactRepository,
  IUserContactRepositoryToken,
} from '@business/repositories/userContacts/iUserContactRepository'
import { left, right } from '@shared/either'

@injectable()
export class CreateUserContactUseCase implements IUseCase<InputCreateUserContactDto, OutputCreateUserContactDto> {
  public constructor(@inject(IUserContactRepositoryToken) private userContactRepository: IUserContactRepository) {}

  async exec(input: InputCreateUserContactDto): Promise<OutputCreateUserContactDto> {
    const userContactResult = UserContactEntity.create(input)

    if (userContactResult.isLeft()) {
      return left(UserContactCreationFailed)
    }

    try {
      const userContact = await this.userContactRepository.create(userContactResult.value.export())

      return right(userContact)
    } catch (error) {
      console.log('CreateUserContactUseCase::error => ', error)
      return left(UserContactCreationFailed)
    }
  }
}
