import { inject, injectable } from 'inversify'

import { IGroupEntity } from '@domain/entities/groups/groupEntity'
import { IGroupRepository } from '@business/repositories/groups/iGroupRepository'
import { GroupModel } from '@framework/models/group'
import { IOutputListGroups } from '@business/dto/groups/groupDto'
import { InputListGroups } from '@controller/serializers/groups/inputListGroups'

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

  async list(props: InputListGroups): Promise<IOutputListGroups> {
    return this.groupModel.findAndCountAll({
      ...(props?.limit && { limit: Number(props.limit) }),
      ...(props?.page && { offset: Number(props.page) }),
      where: { iduser: props.iduser },
    })
  }
}
