import { ContainerModule, interfaces } from 'inversify'

import { IUserRepositoryToken, IUserRepository } from '@business/repositories/users/iUserRepository'
import {
  IUserContactRepository,
  IUserContactRepositoryToken,
} from '@business/repositories/userContacts/iUserContactRepository'
import { UserRepository } from '@framework/repositories/users/userRepository'
import { UserContactRepository } from '@framework/repositories/userContacts/userContactRepository'
import { IEventRepository, IEventRepositoryToken } from '@business/repositories/events/iEventRepository'
import { EventRepository } from '@framework/repositories/events/eventRepository'

export const RepositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository)
  bind<IUserContactRepository>(IUserContactRepositoryToken).to(UserContactRepository)
  bind<IEventRepository>(IEventRepositoryToken).to(EventRepository)
})
