import { DataTypes, Model } from 'sequelize'

import { IUserContactEntity } from '@domain/entities/userContacts/userContactEntity'
import { sequelize } from '@framework/utility/database'
import { UserModel } from './user'
import { ContactModel } from './contact'

export class UserContactsModel extends Model {}
export interface UserContactsModel extends IUserContactEntity {}

UserContactsModel.init(
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
    primary_email: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    primary_phone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    iduser: {
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
  },
  {
    sequelize,
    modelName: 'user_contacts',
    timestamps: true,
    freezeTableName: true,
  }
)

UserContactsModel.belongsTo(ContactModel, {
  foreignKey: 'idcontact',
})

UserContactsModel.belongsTo(UserModel, {
  foreignKey: 'iduser',
})

UserContactsModel.sync()
