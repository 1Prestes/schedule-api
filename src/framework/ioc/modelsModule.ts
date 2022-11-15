import { ContainerModule, interfaces } from 'inversify'

import { UserModel } from '@framework/models/userModel'
import { UserContactModel } from '@framework/models/userContactModel'
import { ContactModel } from '@framework/models/contactModel'

export const ModelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserModel>(UserModel).toConstructor(UserModel)
  bind<UserContactModel>(UserContactModel).toConstructor(UserContactModel)
  bind<ContactModel>(ContactModel).toConstructor(ContactModel)
})
