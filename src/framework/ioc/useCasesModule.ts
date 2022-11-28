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
import { FindContactUseCase } from '@business/useCases/contacts/findContactUseCase'
import { UpdateContactUseCase } from '@business/useCases/contacts/updateContactUseCase'
import { DeleteContactUseCase } from '@business/useCases/contacts/deleteContactUseCase'
import { FindEventUseCase } from '@business/useCases/events/findEventUseCase'
import { AddContactToEventUseCase } from '@business/useCases/eventContacts/addContactToEventUseCase'
import { RemoveContactFromEventUseCase } from '@business/useCases/eventContacts/removeContactFromEventUseCase'
import { CreateGroupUseCase } from '@business/useCases/groups/createGroupsUseCase'
import { ListGroupsUseCase } from '@business/useCases/groups/listGroupsUseCase'
import { UpdateGroupUseCase } from '@business/useCases/groups/updateGroupsUseCase'
import { DeleteGroupUseCase } from '@business/useCases/groups/deleteGroupUseCase'
import { AddContactToGroupUseCase } from '@business/useCases/groups/addContactToGroupUseCase'
import { RemoveContactFromGroupUseCase } from '@business/useCases/groups/removeContactFromGroupUseCase'
import { ListContactsFromGroupUseCase } from '@business/useCases/groups/listContactsFromGroupUseCase'
import { ListContactsFromEventUseCase } from '@business/useCases/eventContacts/listContactsFromEventUseCase'
import { SignInUseCase } from '@business/useCases/authorizer/signInUseCase'

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
  bind(FindEventUseCase).to(FindEventUseCase)
  bind(DeleteEventUseCase).to(DeleteEventUseCase)
  bind(UpdateEventUseCase).to(UpdateEventUseCase)
  bind(CreateContactUseCase).to(CreateContactUseCase)
  bind(ListContactsUseCase).to(ListContactsUseCase)
  bind(FindContactUseCase).to(FindContactUseCase)
  bind(UpdateContactUseCase).to(UpdateContactUseCase)
  bind(DeleteContactUseCase).to(DeleteContactUseCase)
  bind(AddContactToEventUseCase).to(AddContactToEventUseCase)
  bind(RemoveContactFromEventUseCase).to(RemoveContactFromEventUseCase)
  bind(CreateGroupUseCase).to(CreateGroupUseCase)
  bind(ListGroupsUseCase).to(ListGroupsUseCase)
  bind(UpdateGroupUseCase).to(UpdateGroupUseCase)
  bind(DeleteGroupUseCase).to(DeleteGroupUseCase)
  bind(AddContactToGroupUseCase).to(AddContactToGroupUseCase)
  bind(RemoveContactFromGroupUseCase).to(RemoveContactFromGroupUseCase)
  bind(ListContactsFromGroupUseCase).to(ListContactsFromGroupUseCase)
  bind(ListContactsFromEventUseCase).to(ListContactsFromEventUseCase)
  bind(SignInUseCase).to(SignInUseCase)
})
