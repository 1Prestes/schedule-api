import { Model, DataTypes } from 'sequelize'

import { IUserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { sequelize } from '@framework/utility/database'
import { ContactModel } from './contactModel'
import { UserModel } from './userModel'

export class UserContactModel extends Model {
  static associate() {
    UserContactModel.belongsTo(UserModel, {
      foreignKey: 'idcontact',
    })

    UserContactModel.belongsTo(ContactModel, {
      foreignKey: 'iduser',
    })
  }
}

export interface UserContactModel extends IUserContactEntity {}

UserContactModel.init(
  {
    iduser_contact: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(80),
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    main_email: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    main_phone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    user_iduser: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'iduser',
      },
    },
    idcontact: {
      type: DataTypes.UUID,
      references: {
        model: 'contacts',
        key: 'idcontact',
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
