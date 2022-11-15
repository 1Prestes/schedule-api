import { Model, DataTypes } from 'sequelize'

import { sequelize } from '@framework/utility/database'
import { IUserEntity } from '@domain/entities/users/userEntity'

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
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    sequelize,
    freezeTableName: true,
  }
)
