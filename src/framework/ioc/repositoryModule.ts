import { ContainerModule, interfaces } from 'inversify'

import { IUserRepositoryToken, IUserRepository } from '@business/repositories/users/iUserRepository'
import { UserRepository } from '@framework/repositories/users/userRepository'

export const RepositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository)
})
