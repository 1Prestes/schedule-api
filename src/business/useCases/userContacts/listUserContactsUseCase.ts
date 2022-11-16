import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { failureOnGetUserContacts } from '@business/module/errors/userContacts/userContacts'
import {
  IUserContactRepository,
  IUserContactRepositoryToken,
} from '@business/repositories/userContacts/iUserContactRepository'
import { InputListUserContactsDto, OutputListUserContactsDto } from '@business/dto/userContacts/userContactDto'
import { left, right } from '@shared/either'

@injectable()
export class ListUserContactsUseCase implements IUseCase<InputListUserContactsDto, OutputListUserContactsDto> {
  public constructor(@inject(IUserContactRepositoryToken) private userContactRepository: IUserContactRepository) {}

  async exec(input: InputListUserContactsDto): Promise<OutputListUserContactsDto> {
    try {
      const userContacts = await this.userContactRepository.list(input)

      return right(userContacts)
    } catch (error) {
      console.log('userContacts::error => ', error)
      return left(failureOnGetUserContacts)
    }
  }
}
