import { DataTypes, Model } from 'sequelize'

import { IGroupEntity } from '@domain/entities/groups/groupEntity'
import { sequelize } from '@framework/utility/database'
import { UserModel } from './user'
import { ContactModel } from './contact'

export class GroupModel extends Model {}
export interface GroupModel extends IGroupEntity {}

GroupModel.init(
  {
    idgroup: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    iduser: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'iduser',
      },
    },
  },
  {
    sequelize,
    modelName: 'groups',
    timestamps: true,
    freezeTableName: true,
  }
)

const ContactHasGroup = sequelize.define('contact_has_group', {}, { timestamps: false })

GroupModel.belongsTo(UserModel, {
  foreignKey: 'iduser',
})

GroupModel.belongsToMany(ContactModel, {
  through: ContactHasGroup,
  targetKey: 'idcontact',
})

ContactModel.belongsToMany(GroupModel, {
  through: ContactHasGroup,
  targetKey: 'idgroup',
})

GroupModel.sync()
