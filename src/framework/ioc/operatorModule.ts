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
})
