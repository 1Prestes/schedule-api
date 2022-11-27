import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputListGroupsDto, OutputListGroupsDto } from '@business/dto/groups/groupDto'
import { IGroupRepository, IGroupRepositoryToken } from '@business/repositories/groups/iGroupRepository'
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { GroupListingFailed } from '@business/module/errors/groups/group'
import { userNotFound } from '@business/module/errors/users/user'
import { left, right } from '@shared/either'

@injectable()
export class ListGroupsUseCase implements IUseCase<InputListGroupsDto, OutputListGroupsDto> {
  public constructor(
    @inject(IGroupRepositoryToken) private groupRepository: IGroupRepository,
    @inject(IUserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async exec(input: InputListGroupsDto): Promise<OutputListGroupsDto> {
    const userResponse = await this.userRepository.findUserById(input.iduser)

    if (!userResponse) {
      return left(userNotFound)
    }

    try {
      const groupsResponse = await this.groupRepository.list(input)

      return right(groupsResponse)
    } catch (error) {
      console.log('ListGroupsUseCase::error => ', error)

      return left(GroupListingFailed)
    }
  }
}
