import { injectable, inject } from 'inversify'

import { IUserEntity } from '@domain/entities/users/userEntity'
import { IUserRepository } from '@business/repositories/users/iUserRepository'
import { InputListUsersDto, InputUpdateUserDto } from '@business/dto/users/userDto'
import { UserModel } from '@framework/models/users/userModel'

@injectable()
export class UserRepository implements IUserRepository {
  public constructor(@inject(UserModel) private userModel: typeof UserModel) {}

  async findUserById(id: string): Promise<IUserEntity> {
    const where = {
      iduser: id,
    }
    return this.userModel.findOne({ where })
  }

  async create(userEntity: IUserEntity): Promise<IUserEntity> {
    return this.userModel.create({
      iduser: userEntity.id,
      name: userEntity.name,
      username: userEntity.username,
      password: userEntity.password,
      address: userEntity.address,
      birth_date: userEntity.birthDate,
    })
  }

  async list(props: InputListUsersDto): Promise<{
    rows: UserModel[]
    count: number
  }> {
    return this.userModel.findAndCountAll({
      ...(props?.limit && { limit: Number(props.limit) }),
      ...(props?.page && { offset: Number(props.page) }),
    })
  }

  async update(props: InputUpdateUserDto): Promise<boolean> {
    const response = await this.userModel.update(
      {
        name: props.name,
        password: props.password,
        address: props.address,
        birth_date: props.birthDate,
      },
      {
        where: {
          iduser: props.id,
        },
      }
    )

    if (response[0] === 1) {
      return true
    }

    return false
  }

  async deleteUserById(id: string): Promise<boolean> {
    const where = {
      iduser: id,
    }
    const deleteResult = await this.userModel.destroy({ where })

    return !!deleteResult
  }
}
