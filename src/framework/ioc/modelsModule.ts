import { ContainerModule, interfaces } from 'inversify'

import { UserModel } from '@framework/models/users/userModel'
import { UserContactModel } from '@framework/models/userContacts/userContact'

export const ModelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserModel>(UserModel).toConstructor(UserModel)
  bind<UserContactModel>(UserContactModel).toConstructor(UserContactModel)
})
