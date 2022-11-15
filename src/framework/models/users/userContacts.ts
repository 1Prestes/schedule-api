import { Model, DataTypes } from 'sequelize'

import { IUserEntity } from '@domain/entities/users/userEntity'
import { sequelize } from '@framework/utility/database'

export class UserContactsModel extends Model {}

export interface UserContactsModel extends IUserEntity {}

UserContactsModel.init(
  {
    iduser_contact: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_iduser: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'iduser',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'user_contacts',
    timestamps: true,
    underscored: true,
    sequelize,
    freezeTableName: true,
  }
)
