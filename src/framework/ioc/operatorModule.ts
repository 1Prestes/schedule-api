import { ContainerModule, interfaces } from 'inversify'

import { CreateUserOperator } from '@controller/operations/users/createUserOperator'
import { FindUserOperator } from '@controller/operations/users/findUserOperator'
import { ListUsersOperator } from '@controller/operations/users/listUsersOperator'
import { UpdateUserOperator } from '@controller/operations/users/updateUserOperator'
import { DeleteUserOperator } from '@controller/operations/users/deleteUserOperator'
import { CreateUserContactOperator } from '@controller/operations/userContacts/createUserContactOperator'
import { UpdateUserContactOperator } from '@controller/operations/userContacts/updateUserContactOperator'
import { ListUserContactsOperator } from '@controller/operations/userContacts/listUserContactsOperator'
import { DeleteUserContactOperator } from '@controller/operations/userContacts/deleteUserContactOperator'
import { CreateEventOperator } from '@controller/operations/events/createEventOperator'
import { ListEventsOperator } from '@controller/operations/events/listEventsOperator'
import { DeleteEventOperator } from '@controller/operations/events/deleteEventOperator'
import { UpdateEventOperator } from '@controller/operations/events/updateEventOperator'
import { CreateContactOperator } from '@controller/operations/contacts/createContactOperator'
import { ListContactsOperator } from '@controller/operations/contacts/listContactsOperator'
import { FindContactOperator } from '@controller/operations/contacts/findContactOperator'
import { UpdateContactOperator } from '@controller/operations/contacts/updateContactOperator'
import { DeleteContactOperator } from '@controller/operations/contacts/deleteContactOperator'
import { FindEventOperator } from '@controller/operations/events/findEventOperator'
import { AddContactToEventOperator } from '@controller/operations/eventContacts/addContactToEventOperator'
import { RemoveContactFromEventOperator } from '@controller/operations/eventContacts/removeContactFromEventOperator'
import { CreateGroupOperator } from '@controller/operations/groups/createGroupOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserOperator).to(CreateUserOperator)
  bind(FindUserOperator).to(FindUserOperator)
  bind(ListUsersOperator).to(ListUsersOperator)
  bind(UpdateUserOperator).to(UpdateUserOperator)
  bind(DeleteUserOperator).to(DeleteUserOperator)
  bind(CreateUserContactOperator).to(CreateUserContactOperator)
  bind(UpdateUserContactOperator).to(UpdateUserContactOperator)
  bind(ListUserContactsOperator).to(ListUserContactsOperator)
  bind(DeleteUserContactOperator).to(DeleteUserContactOperator)
  bind(CreateEventOperator).to(CreateEventOperator)
  bind(ListEventsOperator).to(ListEventsOperator)
  bind(DeleteEventOperator).to(DeleteEventOperator)
  bind(UpdateEventOperator).to(UpdateEventOperator)
  bind(FindEventOperator).to(FindEventOperator)
  bind(CreateContactOperator).to(CreateContactOperator)
  bind(ListContactsOperator).to(ListContactsOperator)
  bind(FindContactOperator).to(FindContactOperator)
  bind(UpdateContactOperator).to(UpdateContactOperator)
  bind(DeleteContactOperator).to(DeleteContactOperator)
  bind(AddContactToEventOperator).to(AddContactToEventOperator)
  bind(RemoveContactFromEventOperator).to(RemoveContactFromEventOperator)
  bind(CreateGroupOperator).to(CreateGroupOperator)
})
