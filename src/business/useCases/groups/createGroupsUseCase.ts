import { injectable, inject } from 'inversify'

import { IUseCase } from '../iUseCase'
import { GroupEntity } from '@domain/entities/groups/groupEntity'
import { InputCreateGroupDto, OutputCreateGroupDto } from '@business/dto/groups/groupDto'
import { IGroupRepository, IGroupRepositoryToken } from '@business/repositories/groups/iGroupRepository'
import { IUserRepository, IUserRepositoryToken } from '@business/repositories/users/iUserRepository'
import { AGroupWithThisTitleAlreadyExists, GroupCreationFailed } from '@business/module/errors/groups/group'
import { userNotFound } from '@business/module/errors/users/user'
import { left, right } from '@shared/either'

@injectable()
export class CreateGroupUseCase implements IUseCase<InputCreateGroupDto, OutputCreateGroupDto> {
  public constructor(
    @inject(IGroupRepositoryToken) private groupRepository: IGroupRepository,
    @inject(IUserRepositoryToken) private userRepository: IUserRepository
  ) {}

  async exec(input: InputCreateGroupDto): Promise<OutputCreateGroupDto> {
    const userResponse = await this.userRepository.findUserById(input.iduser)

    if (!userResponse) {
      return left(userNotFound)
    }

    const groupExists = await this.groupRepository.findGroup(input)

    if (groupExists) {
      return left(AGroupWithThisTitleAlreadyExists)
    }

    const groupResult = GroupEntity.create({
      title: input.title,
      iduser: input.iduser,
    })

    if (groupResult.isLeft()) {
      return left(GroupCreationFailed)
    }

    try {
      const groupResponse = await this.groupRepository.create(groupResult.value.export())

      return right(groupResponse)
    } catch (error) {
      console.log('CreateGroupUseCase::error => ', error)

      return left(GroupCreationFailed)
    }
  }
}
