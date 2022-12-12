import { IGroupEntity } from '@domain/entities/groups/groupEntity'
import {
  InputAddContactToGroupDto,
  InputDeleteGroupDto,
  InputListContactsFromGroupDto,
  InputListGroupsDto,
  InputRemoveContactFromGroupDto,
  InputUpdateGroupDto,
  IOutputListGroups,
} from '@business/dto/groups/groupDto'

export const IGroupRepositoryToken = Symbol.for('IGroupRepository')

export interface IFindGroup {
  title: string
  iduser: string
}

export interface IGroupRepository {
  create(groupEntity: IGroupEntity): Promise<IGroupEntity>
  findGroup(props: IFindGroup): Promise<IGroupEntity>
  findGroupById(id: string): Promise<IGroupEntity>
  list(props: InputListGroupsDto): Promise<IOutputListGroups>
  update(groupEntity: InputUpdateGroupDto): Promise<boolean>
  delete(props: InputDeleteGroupDto): Promise<boolean>
  addContactToGroup(props: InputAddContactToGroupDto): Promise<IGroupEntity>
  removeContactFromGroup(props: InputRemoveContactFromGroupDto): Promise<boolean>
  listContactsFromGroup(props: InputListContactsFromGroupDto): Promise<any>
}
