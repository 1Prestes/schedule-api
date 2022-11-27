import { DataTypes, Model } from 'sequelize'

import { IEventEntity } from '@domain/entities/events/eventEntity'
import { sequelize } from '@framework/utility/database'
import { UserModel } from './user'
import { ContactModel } from './contact'

export class EventModel extends Model {
  addContact: any
  removeContact: any
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
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize,
    modelName: 'events',
    timestamps: true,
    freezeTableName: true,
  }
)

const ContactHasEventsModel = sequelize.define('contact_has_events', {}, { timestamps: false })

EventModel.belongsTo(UserModel, {
  foreignKey: 'iduser',
})

EventModel.belongsToMany(ContactModel, {
  through: ContactHasEventsModel,
  targetKey: 'idcontact',
})

ContactModel.belongsToMany(EventModel, {
  through: ContactHasEventsModel,
  targetKey: 'idevent',
})

ContactHasEventsModel.sync()
EventModel.sync()
