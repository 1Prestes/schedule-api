import { ContainerModule, interfaces } from 'inversify'

import { CreateUserOperator } from '@controller/operations/users/createUserOperator'
import { FindUserOperator } from '@controller/operations/users/findUserOperator'
import { ListUsersOperator } from '@controller/operations/users/listUsersOperator'
import { UpdateUserOperator } from '@controller/operations/users/updateUserOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserOperator).to(CreateUserOperator)
  bind(FindUserOperator).to(FindUserOperator)
  bind(ListUsersOperator).to(ListUsersOperator)
  bind(UpdateUserOperator).to(UpdateUserOperator)
})
