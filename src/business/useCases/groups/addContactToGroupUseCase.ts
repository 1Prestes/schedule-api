import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputAddContactToGroupDto, OutputAddContactToGroupDto } from '@business/dto/groups/groupDto'
import { IGroupRepository, IGroupRepositoryToken } from '@business/repositories/groups/iGroupRepository'
import { IContactRepository, IContactRepositoryToken } from '@business/repositories/contacts/iContactRepository'
import { FailedToAddUserToAGroup, GroupNotFound } from '@business/module/errors/groups/group'
import { ContactNotFound } from '@business/module/errors/contacts/contacts'
import { left, right } from '@shared/either'

@injectable()
export class AddContactToGroupUseCase implements IUseCase<InputAddContactToGroupDto, OutputAddContactToGroupDto> {
  public constructor(
    @inject(IGroupRepositoryToken) private groupRepository: IGroupRepository,
    @inject(IContactRepositoryToken) private contactRepository: IContactRepository
  ) {}

  async exec(input: InputAddContactToGroupDto): Promise<OutputAddContactToGroupDto> {
    try {
      const contactResult = await this.contactRepository.findContactById(input.idcontact)

      if (!contactResult) {
        return left(ContactNotFound)
      }

      const groupResult = await this.groupRepository.findGroupById(input.idgroup)

      if (!groupResult) {
        return left(GroupNotFound)
      }

      const addContactToGroupResponse = await this.groupRepository.addContactToGroup(input)

      return right(addContactToGroupResponse)
    } catch (error) {
      console.log('AddContactToGroupUseCase::error => ', error)

      return left(FailedToAddUserToAGroup)
    }
  }
}
