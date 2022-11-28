import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { SignInUseCase } from '@business/useCases/authorizer/signInUseCase'
import { InputSignIn } from '@controller/serializers/authorizer/inputSignIn'
import { OutputSignIn } from '@controller/serializers/authorizer/outputSignIn'
import { left, right } from '@shared/either'

@injectable()
export class SignInOperator extends AbstractOperator<InputSignIn, OutputSignIn> {
  public constructor(@inject(SignInUseCase) private signInUseCase: SignInUseCase) {
    super()
  }

  protected async run(input: InputSignIn): Promise<OutputSignIn> {
    const result = await this.signInUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
