import { Model, DataTypes } from 'sequelize'

import { IEventEntity } from '@domain/entities/events/eventEntity'
import { sequelize } from '@framework/utility/database'
import { UserModel } from './userModel'
import { ContactModel } from './contactModel'

export class EventModel extends Model {
  static associate() {
    EventModel.belongsTo(UserModel, {
      foreignKey: 'iduser',
    })

    EventModel.belongsToMany(ContactModel, {
      through: 'contact_has_events',
    })
  }
}
export interface EventModel extends IEventEntity {}

EventModel.init(
  {
    idevent: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT('medium'),
      allowNull: false,
    },
    initial_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    final_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    place: {
      type: DataTypes.STRING(150),
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'events',
  }
)
