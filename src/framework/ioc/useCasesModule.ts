import { ContainerModule, interfaces } from 'inversify'

import { CreateUserUseCase } from '@business/useCases/users/createUserUseCase'
import { FindUserUseCase } from '@business/useCases/users/findUserUseCase'
import { ListUsersUseCase } from '@business/useCases/users/listUsersUseCase'
import { UpdateUserUseCase } from '@business/useCases/users/updateUserUseCase'

export const UseCasesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCase).to(CreateUserUseCase)
  bind(FindUserUseCase).to(FindUserUseCase)
  bind(ListUsersUseCase).to(ListUsersUseCase)
  bind(UpdateUserUseCase).to(UpdateUserUseCase)
})
