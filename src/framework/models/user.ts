import { DataTypes, Model } from 'sequelize'

import { IUserEntity } from '@domain/entities/users/userEntity'
import { sequelize } from '@framework/utility/database'

export class UserModel extends Model {}
export interface UserModel extends IUserEntity {}

UserModel.init(
  {
    iduser: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'users',
    timestamps: true,
    freezeTableName: true,
  }
)

UserModel.sync()
