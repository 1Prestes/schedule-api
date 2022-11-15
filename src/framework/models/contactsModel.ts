import { Model, DataTypes } from 'sequelize'

import { sequelize } from '@framework/utility/database'
import { IContactEntity } from '@domain/entities/contacts/contactEntity'
import { UserModel } from './userModel'

export class ContactModel extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   * */
  static associate() {
    // define association here
    ContactModel.belongsTo(UserModel, {
      foreignKey: 'iduser',
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
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'contacts',
  }
)
