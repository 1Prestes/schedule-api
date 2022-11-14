import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { ListUsersUseCase } from '@business/useCases/users/listUsersUseCase'
import { InputListUsers } from '@controller/serializers/users/inputListUsers'
import { OutputListUsers } from '@controller/serializers/users/outputListUsers'
import { left, right } from '@shared/either'

@injectable()
export class ListUsersOperator extends AbstractOperator<InputListUsers, OutputListUsers> {
  public constructor(@inject(ListUsersUseCase) private listUsersUseCase: ListUsersUseCase) {
    super()
  }

  protected async run(input: InputListUsers): Promise<OutputListUsers> {
    const result = await this.listUsersUseCase.exec({
      page: input.page,
      limit: input.limit,
    })

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
