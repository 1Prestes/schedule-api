import { injectable, inject } from 'inversify'

import { IUserEntity } from '@domain/entities/users/userEntity'
import { IUserRepository } from '@business/repositories/users/iUserRepository'
import { InputListUsersDto, InputUpdateUserDto } from '@business/dto/users/userDto'
import { UserModel } from '@framework/models/user'

@injectable()
export class UserRepository implements IUserRepository {
  public constructor(@inject(UserModel) private userModel: typeof UserModel) {}

  async findUserById(iduser: string): Promise<IUserEntity> {
    const where = {
      iduser,
    }

    return this.userModel.findOne({
      where,
      attributes: { exclude: ['password'] },
    })
  }

  async create(userEntity: IUserEntity): Promise<IUserEntity> {
    const createResponse = await this.userModel.create({
      iduser: userEntity.iduser,
      name: userEntity.name,
      username: userEntity.username,
      password: userEntity.password,
      address: userEntity.address,
      birth_date: userEntity.birthDate,
    })

    delete createResponse.dataValues.password

    return createResponse.dataValues
  }

  async list(props: InputListUsersDto): Promise<{
    rows: IUserEntity[]
    count: number
  }> {
    return this.userModel.findAndCountAll({
      ...(props?.limit && { limit: Number(props.limit) }),
      ...(props?.page && { offset: Number(props.page) }),
      attributes: { exclude: ['password'] },
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
          iduser: props.iduser,
        },
      }
    )

    if (response[0] === 1) {
      return true
    }

    return false
  }

  async deleteUserById(iduser: string): Promise<boolean> {
    const where = {
      iduser,
    }
    const deleteResult = await this.userModel.destroy({ where })

    return !!deleteResult
  }

  async getUserByUsername(username: string): Promise<IUserEntity> {
    const where = { username }

    return this.userModel.findOne({ where })
  }
}
