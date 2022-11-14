import { injectable, inject } from 'inversify'

import { DeleteUserUseCase } from '@business/useCases/users/deleteUserUseCase'
import { InputDeleteUser } from '@controller/serializers/users/inputDeleteUser'
import { OutputDeleteUser } from '@controller/serializers/users/outputDeleteUser'
import { AbstractOperator } from '../abstractOperator'
import { left, right } from '@shared/either'

@injectable()
export class DeleteUserOperator extends AbstractOperator<InputDeleteUser, OutputDeleteUser> {
  public constructor(@inject(DeleteUserUseCase) private deleteUserUseCase: DeleteUserUseCase) {
    super()
  }

  protected async run(input: InputDeleteUser): Promise<OutputDeleteUser> {
    const result = await this.deleteUserUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
