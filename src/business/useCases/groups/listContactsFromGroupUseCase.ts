import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputListContactsFromGroupDto, OutputListContactsFromGroupDto } from '@business/dto/groups/groupDto'
import { IGroupRepository, IGroupRepositoryToken } from '@business/repositories/groups/iGroupRepository'
import { FailedToListContactsFromGroup, GroupNotFound } from '@business/module/errors/groups/group'
import { left, right } from '@shared/either'

@injectable()
export class ListContactsFromGroupUseCase
  implements IUseCase<InputListContactsFromGroupDto, OutputListContactsFromGroupDto>
{
  public constructor(@inject(IGroupRepositoryToken) private groupRepository: IGroupRepository) {}

  async exec(input: InputListContactsFromGroupDto): Promise<OutputListContactsFromGroupDto> {
    try {
      const groupResult = await this.groupRepository.findGroupById(input.idgroup)

      if (!groupResult) {
        return left(GroupNotFound)
      }

      const listContactsFromGroupResponse = await this.groupRepository.listContactsFromGroup(input)

      return right(listContactsFromGroupResponse)
    } catch (error) {
      console.log('ListContactsFromGroupUseCase::error => ', error)

      return left(FailedToListContactsFromGroup)
    }
  }
}
