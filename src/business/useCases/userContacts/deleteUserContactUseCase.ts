import { injectable, inject } from 'inversify'

import {
  IUserContactRepository,
  IUserContactRepositoryToken,
} from '@business/repositories/userContacts/iUserContactRepository'
import { FailedToDeleteUserContact, UserContactNotFound } from '@business/module/errors/userContacts/userContacts'
import { InputDeleteUserContactDto, OutputDeleteUserContactDto } from '@business/dto/userContacts/userContactDto'
import { IUseCase } from '../iUseCase'
import { left, right } from '@shared/either'

@injectable()
export class DeleteUserContactUseCase implements IUseCase<InputDeleteUserContactDto, OutputDeleteUserContactDto> {
  public constructor(@inject(IUserContactRepositoryToken) private userContactRepository: IUserContactRepository) {}

  async exec(input: InputDeleteUserContactDto): Promise<OutputDeleteUserContactDto> {
    const user = await this.userContactRepository.deleteUserContactById(input.id)

    try {
      if (!user) {
        return left(UserContactNotFound)
      }

      return right(user)
    } catch (error) {
      return left(FailedToDeleteUserContact)
    }
  }
}
