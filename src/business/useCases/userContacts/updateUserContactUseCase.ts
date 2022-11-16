import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputUserContactDto, OutputUpdateUserContactDto } from '@business/dto/userContacts/userContactDto'
import { UserContactUpdateFailed } from '@business/module/errors/userContacts/userContacts'
import {
  IUserContactRepository,
  IUserContactRepositoryToken,
} from '@business/repositories/userContacts/iUserContactRepository'
import { HandleUserContact } from '../handle/handleUserContact'
import { left, right } from '@shared/either'

@injectable()
export class UpdateUserContactUseCase implements IUseCase<InputUserContactDto, OutputUpdateUserContactDto> {
  public constructor(@inject(IUserContactRepositoryToken) private userContactRepository: IUserContactRepository) {}

  async exec(input: InputUserContactDto): Promise<OutputUpdateUserContactDto> {
    const handleUserContact = new HandleUserContact()

    const hasContact = handleUserContact.hasContact(input)
    if (hasContact.isLeft()) return left(hasContact.value)

    const hasPrimaryContact = handleUserContact.hasPrimaryContact(input)
    if (hasPrimaryContact.isLeft()) return left(hasPrimaryContact.value)

    try {
      const userContactResponse = await this.userContactRepository.update(input)

      return right(userContactResponse)
    } catch (error) {
      console.log('UpdateUserContactUseCase::error => ', error)
      return left(UserContactUpdateFailed)
    }
  }
}
