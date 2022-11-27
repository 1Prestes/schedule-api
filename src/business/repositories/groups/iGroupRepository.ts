import { IGroupEntity } from '@domain/entities/groups/groupEntity'

export const IGroupRepositoryToken = Symbol.for('IGroupRepository')

export interface IGroupRepository {
  create(contactEntity: IGroupEntity): Promise<IGroupEntity>
  findGroupByTitle(title: string): Promise<IGroupEntity>
}
