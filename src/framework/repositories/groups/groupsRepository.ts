import { inject, injectable } from 'inversify'

import { IGroupEntity } from '@domain/entities/groups/groupEntity'
import { IGroupRepository } from '@business/repositories/groups/iGroupRepository'
import { GroupModel } from '@framework/models/group'
import { InputDeleteGroupDto, InputUpdateGroupDto, IOutputListGroups } from '@business/dto/groups/groupDto'
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

  async update(props: InputUpdateGroupDto): Promise<boolean> {
    const response = await this.groupModel.update(
      {
        title: props.title,
      },
      {
        where: {
          iduser: props.iduser,
        },
      }
    )

    if (response[0] === 1) {
      return true
    }

    return false
  }

  async delete(props: InputDeleteGroupDto): Promise<boolean> {
    const where = {
      idgroup: props.idgroup,
      iduser: props.iduser,
    }
    const deleteResult = await this.groupModel.destroy({ where })

    return !!deleteResult
  }
}
