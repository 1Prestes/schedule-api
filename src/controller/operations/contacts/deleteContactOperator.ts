import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { DeleteContactUseCase } from '@business/useCases/contacts/deleteContactUseCase'
import { InputDeleteContact } from '@controller/serializers/contacts/inputDeleteContact'
import { OutputDeleteContact } from '@controller/serializers/contacts/outputDeleteContact'
import { left, right } from '@shared/either'

@injectable()
export class DeleteContactOperator extends AbstractOperator<InputDeleteContact, OutputDeleteContact> {
  public constructor(@inject(DeleteContactUseCase) private deleteContactUseCase: DeleteContactUseCase) {
    super()
  }

  protected async run(input: InputDeleteContact): Promise<OutputDeleteContact> {
    const result = await this.deleteContactUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
