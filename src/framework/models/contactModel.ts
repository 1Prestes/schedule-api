import { Model, DataTypes } from 'sequelize'

import { IContactEntity } from '@domain/entities/contacts/contactEntity'
import { sequelize } from '@framework/utility/database'
import { UserModel } from './userModel'
import { GroupModel } from './groupModel'
import { EventModel } from './eventModel'

export class ContactModel extends Model {
  static associate() {
    ContactModel.belongsTo(UserModel, {
      foreignKey: 'iduser',
    })

    ContactModel.belongsToMany(GroupModel, {
      through: 'contact_has_group',
    })

    ContactModel.belongsToMany(EventModel, {
      through: 'contact_has_events',
    })
  }
}

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
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'contacts',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  }
)
