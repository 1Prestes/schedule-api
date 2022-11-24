import { ContainerModule, interfaces } from 'inversify'

import { CreateUserUseCase } from '@business/useCases/users/createUserUseCase'
import { FindUserUseCase } from '@business/useCases/users/findUserUseCase'
import { ListUsersUseCase } from '@business/useCases/users/listUsersUseCase'
import { UpdateUserUseCase } from '@business/useCases/users/updateUserUseCase'
import { DeleteUserUseCase } from '@business/useCases/users/deleteUserUseCase'
import { CreateUserContactUseCase } from '@business/useCases/userContacts/createUserContactUseCase'
import { UpdateUserContactUseCase } from '@business/useCases/userContacts/updateUserContactUseCase'
import { ListUserContactsUseCase } from '@business/useCases/userContacts/listUserContactsUseCase'
import { DeleteUserContactUseCase } from '@business/useCases/userContacts/deleteUserContactUseCase'
import { CreateEventUseCase } from '@business/useCases/events/createEventUseCase'
import { ListEventsUseCase } from '@business/useCases/events/listEventsUseCase'
import { DeleteEventUseCase } from '@business/useCases/events/deleteEventUseCase'
import { UpdateEventUseCase } from '@business/useCases/events/updateEventUseCase'
import { CreateContactUseCase } from '@business/useCases/contacts/createContactUseCase'
import { ListContactsUseCase } from '@business/useCases/contacts/listContactsUseCase'

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCase).to(CreateUserUseCase)
  bind(FindUserUseCase).to(FindUserUseCase)
  bind(ListUsersUseCase).to(ListUsersUseCase)
  bind(UpdateUserUseCase).to(UpdateUserUseCase)
  bind(DeleteUserUseCase).to(DeleteUserUseCase)
  bind(CreateUserContactUseCase).to(CreateUserContactUseCase)
  bind(UpdateUserContactUseCase).to(UpdateUserContactUseCase)
  bind(ListUserContactsUseCase).to(ListUserContactsUseCase)
  bind(DeleteUserContactUseCase).to(DeleteUserContactUseCase)
  bind(CreateEventUseCase).to(CreateEventUseCase)
  bind(ListEventsUseCase).to(ListEventsUseCase)
  bind(DeleteEventUseCase).to(DeleteEventUseCase)
  bind(UpdateEventUseCase).to(UpdateEventUseCase)
  bind(CreateContactUseCase).to(CreateContactUseCase)
  bind(ListContactsUseCase).to(ListContactsUseCase)
})
