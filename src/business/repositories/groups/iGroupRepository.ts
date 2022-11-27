import { IGroupEntity } from '@domain/entities/groups/groupEntity'
import {
  InputAddContactToGroupDto,
  InputDeleteGroupDto,
  InputListGroupsDto,
  InputRemoveContactFromGroupDto,
  InputUpdateGroupDto,
  IOutputListGroups,
} from '@business/dto/groups/groupDto'

export const IGroupRepositoryToken = Symbol.for('IGroupRepository')

export interface IGroupRepository {
  create(groupEntity: IGroupEntity): Promise<IGroupEntity>
  findGroupByTitle(title: string): Promise<IGroupEntity>
  findGroupById(id: string): Promise<IGroupEntity>
  list(props: InputListGroupsDto): Promise<IOutputListGroups>
  update(groupEntity: InputUpdateGroupDto): Promise<boolean>
  delete(props: InputDeleteGroupDto): Promise<boolean>
  addContactToGroup(props: InputAddContactToGroupDto): Promise<IGroupEntity>
  removeContactFromGroup(props: InputRemoveContactFromGroupDto): Promise<boolean>
}
