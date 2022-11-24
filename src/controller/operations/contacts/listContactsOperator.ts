import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { ListContactsUseCase } from '@business/useCases/contacts/listContactsUseCase'
import { InputListContacts } from '@controller/serializers/contacts/inputListContacts'
import { OutputListContacts } from '@controller/serializers/contacts/outputListContacts'
import { left, right } from '@shared/either'

@injectable()
export class ListContactsOperator extends AbstractOperator<InputListContacts, OutputListContacts> {
  public constructor(@inject(ListContactsUseCase) private listContactsUseCase: ListContactsUseCase) {
    super()
  }

  protected async run(input: InputListContacts): Promise<OutputListContacts> {
    const result = await this.listContactsUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
