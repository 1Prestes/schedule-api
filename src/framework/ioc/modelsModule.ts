import { ContactModel } from '@framework/models/contact'
import { EventModel } from '@framework/models/event'
import { GroupModel } from '@framework/models/group'
import { UserModel } from '@framework/models/user'
import { UserContactsModel } from '@framework/models/usercontacts'
import { ContainerModule, interfaces } from 'inversify'

export const ModelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserModel>(UserModel).toConstructor(UserModel)
  bind<UserContactsModel>(UserContactsModel).toConstructor(UserContactsModel)
  bind<ContactModel>(ContactModel).toConstructor(ContactModel)
  bind<EventModel>(EventModel).toConstructor(EventModel)
  bind<GroupModel>(GroupModel).toConstructor(GroupModel)
})
