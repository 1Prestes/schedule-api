import { IGroupEntity } from '@domain/entities/groups/groupEntity'
import { InputListGroupsDto, InputUpdateGroupDto, IOutputListGroups } from '@business/dto/groups/groupDto'

export const IGroupRepositoryToken = Symbol.for('IGroupRepository')

export interface IGroupRepository {
  create(groupEntity: IGroupEntity): Promise<IGroupEntity>
  findGroupByTitle(title: string): Promise<IGroupEntity>
  list(props: InputListGroupsDto): Promise<IOutputListGroups>
  update(groupEntity: InputUpdateGroupDto): Promise<boolean>
}
