import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { UpdateContactUseCase } from '@business/useCases/contacts/updateContactUseCase'
import { InputUpdateContact } from '@controller/serializers/contacts/inputUpdateContact'
import { OutputUpdateContact } from '@controller/serializers/contacts/outputUpdateContact'
import { left, right } from '@shared/either'

@injectable()
export class UpdateContactOperator extends AbstractOperator<InputUpdateContact, OutputUpdateContact> {
  public constructor(@inject(UpdateContactUseCase) private updateContactUseCase: UpdateContactUseCase) {
    super()
  }

  protected async run(input: InputUpdateContact): Promise<OutputUpdateContact> {
    const result = await this.updateContactUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
