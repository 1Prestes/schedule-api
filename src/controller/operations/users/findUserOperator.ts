import { injectable, inject } from 'inversify'

import { InputFindUser } from '@controller/serializers/users/inputFindUser'
import { OutputFindUser } from '@controller/serializers/users/outputFindUser'
import { FindUserUseCase } from '@business/useCases/users/findUserUseCase'
import { AbstractOperator } from '../abstractOperator'
import { left, right } from '@shared/either'

@injectable()
export class FindUserOperator extends AbstractOperator<InputFindUser, OutputFindUser> {
  public constructor(@inject(FindUserUseCase) private findUserUseCase: FindUserUseCase) {
    super()
  }

  protected async run(input: InputFindUser): Promise<OutputFindUser> {
    const result = await this.findUserUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
