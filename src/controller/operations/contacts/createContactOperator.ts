import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { CreateContactUseCase } from '@business/useCases/contacts/createContactUseCase'
import { InputCreateContact } from '@controller/serializers/contacts/inputCreateContact'
import { OutputCreateContact } from '@controller/serializers/contacts/outputCreateContact'
import { left, right } from '@shared/either'

@injectable()
export class CreateContactOperator extends AbstractOperator<InputCreateContact, OutputCreateContact> {
  public constructor(@inject(CreateContactUseCase) private createContactUseCase: CreateContactUseCase) {
    super()
  }

  protected async run(input: InputCreateContact): Promise<OutputCreateContact> {
    const result = await this.createContactUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
