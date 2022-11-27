import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputRemoveContactFromGroupDto, OutputRemoveContactFromGroupDto } from '@business/dto/groups/groupDto'
import { IGroupRepository, IGroupRepositoryToken } from '@business/repositories/groups/iGroupRepository'
import { IContactRepository, IContactRepositoryToken } from '@business/repositories/contacts/iContactRepository'
import { ContactNotFound } from '@business/module/errors/contacts/contacts'
import { ContactRemoveFailed } from '@business/module/errors/events/event'
import { GroupNotFound } from '@business/module/errors/groups/group'
import { left, right } from '@shared/either'

@injectable()
export class RemoveContactFromGroupUseCase
  implements IUseCase<InputRemoveContactFromGroupDto, OutputRemoveContactFromGroupDto>
{
  public constructor(
    @inject(IGroupRepositoryToken) private groupRepository: IGroupRepository,
    @inject(IContactRepositoryToken) private contactRepository: IContactRepository
  ) {}

  async exec(input: InputRemoveContactFromGroupDto): Promise<OutputRemoveContactFromGroupDto> {
    try {
      const contactResult = await this.contactRepository.findContactById(input.idcontact)

      if (!contactResult) {
        return left(ContactNotFound)
      }

      const groupResult = await this.groupRepository.findGroupById(input.idgroup)

      if (!groupResult) {
        return left(GroupNotFound)
      }

      const removeContactFromGroupResponse = await this.groupRepository.removeContactFromGroup(input)

      return right(removeContactFromGroupResponse)
    } catch (error) {
      console.log('RemoveContactFromGroupUseCase::error => ', error)

      return left(ContactRemoveFailed)
    }
  }
}
