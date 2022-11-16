import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { CreateUserContactUseCase } from '@business/useCases/userContacts/createUserContactUseCase'
import { InputCreateUserContact } from '@controller/serializers/userContacts/inputCreateUserContact'
import { OutputCreateUserContact } from '@controller/serializers/userContacts/outputCreateUserContact'
import { left, right } from '@shared/either'

@injectable()
export class CreateUserContactOperator extends AbstractOperator<InputCreateUserContact, OutputCreateUserContact> {
  public constructor(@inject(CreateUserContactUseCase) private createUserContactUseCase: CreateUserContactUseCase) {
    super()
  }

  protected async run(input: InputCreateUserContact): Promise<OutputCreateUserContact> {
    const result = await this.createUserContactUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
