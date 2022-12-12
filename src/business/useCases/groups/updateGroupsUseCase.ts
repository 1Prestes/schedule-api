import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { InputUpdateGroupDto, OutputUpdateGroupDto } from '@business/dto/groups/groupDto'
import { IGroupRepository, IGroupRepositoryToken } from '@business/repositories/groups/iGroupRepository'
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { GroupUpdateFailed, AGroupWithThisTitleAlreadyExists } from '@business/module/errors/groups/group'
import { userNotFound } from '@business/module/errors/users/user'
import { left, right } from '@shared/either'

@injectable()
export class UpdateGroupUseCase implements IUseCase<InputUpdateGroupDto, OutputUpdateGroupDto> {
  public constructor(
    @inject(IGroupRepositoryToken) private groupRepository: IGroupRepository,
    @inject(IUserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async exec(input: InputUpdateGroupDto): Promise<OutputUpdateGroupDto> {
    try {
      const userResponse = await this.userRepository.findUserById(input.iduser)

      if (!userResponse) {
        return left(userNotFound)
      }

      const groupExists = await this.groupRepository.findGroup(input)

      if (groupExists) {
        return left(AGroupWithThisTitleAlreadyExists)
      }

      const groupResponse = await this.groupRepository.update(input)

      return right(groupResponse)
    } catch (error) {
      console.log('UpdateGroupUseCase::error => ', error)

      return left(GroupUpdateFailed)
    }
  }
}
