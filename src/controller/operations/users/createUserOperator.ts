import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { CreateUserUseCase } from '@business/useCases/users/createUserUseCase'
import { InputCreateUser } from '@controller/serializers/users/inputCreateUser'
import { OutputCreateUser } from '@controller/serializers/users/outputCreateUser'
import { left, right } from '@shared/either'

@injectable()
export class CreateUserOperator extends AbstractOperator<InputCreateUser, OutputCreateUser> {
  public constructor(@inject(CreateUserUseCase) private createUserUseCase: CreateUserUseCase) {
    super()
  }

  protected async run(input: InputCreateUser): Promise<OutputCreateUser> {
    const result = await this.createUserUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
