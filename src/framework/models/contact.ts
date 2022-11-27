import { DataTypes, Model } from 'sequelize'

import { IContactEntity } from '@domain/entities/contacts/contactEntity'
import { sequelize } from '@framework/utility/database'
import { UserModel } from './user'

export class ContactModel extends Model {}
export interface ContactModel extends IContactEntity {}

ContactModel.init(
  {
    idcontact: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    iduser: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'iduser',
      },
    },
  },
  {
    sequelize,
    modelName: 'contacts',
    timestamps: true,
    freezeTableName: true,
  }
)

ContactModel.belongsTo(UserModel, {
  foreignKey: 'iduser',
})

ContactModel.sync()
