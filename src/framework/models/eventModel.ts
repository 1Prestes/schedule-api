import { Model, DataTypes } from 'sequelize'

import { IEventEntity } from '@domain/entities/events/eventEntity'
import { sequelize } from '@framework/utility/database'

export class EventsModel extends Model {}
export interface EventsModel extends IEventEntity {}

EventsModel.init(
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
