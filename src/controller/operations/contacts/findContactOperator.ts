import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { FindContactUseCase } from '@business/useCases/contacts/findContactUseCase'
import { InputFindContact } from '@controller/serializers/contacts/inputFindContact'
import { OutputFindContact } from '@controller/serializers/contacts/outputFindContact'
import { left, right } from '@shared/either'

@injectable()
export class FindContactOperator extends AbstractOperator<InputFindContact, OutputFindContact> {
  public constructor(@inject(FindContactUseCase) private findContactUseCase: FindContactUseCase) {
    super()
  }

  protected async run(input: InputFindContact): Promise<OutputFindContact> {
    const result = await this.findContactUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
