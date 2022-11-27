import { inject, injectable } from 'inversify'

import { IGroupEntity } from '@domain/entities/groups/groupEntity'
import { IGroupRepository } from '@business/repositories/groups/iGroupRepository'
import { GroupModel } from '@framework/models/group'

@injectable()
export class GroupRepository implements IGroupRepository {
  public constructor(@inject(GroupModel) private groupModel: typeof GroupModel) {}

  async create(groupEntity: IGroupEntity): Promise<IGroupEntity> {
    return this.groupModel.create({
      idgroup: groupEntity.idgroup,
      iduser: groupEntity.iduser,
      title: groupEntity.title,
    })
  }

  async findGroupByTitle(title: string): Promise<IGroupEntity> {
    return this.groupModel.findOne({
      where: { title },
    })
  }
}
