import { Model, DataTypes } from 'sequelize'

import { IGroupEntity } from '@domain/entities/groups/groupEntity'
import { sequelize } from '@framework/utility/database'
import { ContactModel } from './contactModel'

export class GroupModel extends Model {
  static associate() {
    GroupModel.belongsToMany(ContactModel, {
      through: 'contact_has_group',
    })
  }
}

export interface GroupModel extends IGroupEntity {}

GroupModel.init(
  {
    idgroup: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'groups',
    timestamps: true,
    underscored: true,
    sequelize,
    freezeTableName: true,
  }
)
