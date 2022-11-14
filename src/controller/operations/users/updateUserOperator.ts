import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { InputUpdateUser } from '@controller/serializers/users/inputUpdateUser'
import { OutputUpdateUser } from '@controller/serializers/users/outputUpdateUser'
import { left, right } from '@shared/either'
import { UpdateUserUseCase } from '@business/useCases/users/updateUserUseCase'

@injectable()
export class UpdateUserOperator extends AbstractOperator<InputUpdateUser, OutputUpdateUser> {
  public constructor(@inject(UpdateUserUseCase) private updateUserUseCase: UpdateUserUseCase) {
    super()
  }

  protected async run(input: InputUpdateUser): Promise<OutputUpdateUser> {
    const result = await this.updateUserUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
