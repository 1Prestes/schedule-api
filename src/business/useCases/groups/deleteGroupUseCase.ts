import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputDeleteGroupDto, OutputDeleteGroupDto } from '@business/dto/groups/groupDto'
import { IGroupRepository, IGroupRepositoryToken } from '@business/repositories/groups/iGroupRepository'
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { FailedToDeleteGroup, GroupNotFound } from '@business/module/errors/groups/group'
import { userNotFound } from '@business/module/errors/users/user'
import { left, right } from '@shared/either'

@injectable()
export class DeleteGroupUseCase implements IUseCase<InputDeleteGroupDto, OutputDeleteGroupDto> {
  public constructor(
    @inject(IGroupRepositoryToken) private groupRepository: IGroupRepository,
    @inject(IUserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async exec(input: InputDeleteGroupDto): Promise<OutputDeleteGroupDto> {
    try {
      const userResponse = await this.userRepository.findUserById(input.iduser)

      if (!userResponse) {
        return left(userNotFound)
      }

      const deleteGroupResponse = await this.groupRepository.delete(input)

      if (!deleteGroupResponse) {
        return left(GroupNotFound)
      }

      return right(deleteGroupResponse)
    } catch (error) {
      return left(FailedToDeleteGroup)
    }
  }
}
