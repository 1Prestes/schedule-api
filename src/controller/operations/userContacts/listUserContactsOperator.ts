import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { ListUserContactsUseCase } from '@business/useCases/userContacts/listUserContactsUseCase'
import { InputListUserContacts } from '@controller/serializers/userContacts/inputListUserContacts'
import { OutputListUserContacts } from '@controller/serializers/userContacts/outputListUserContacts'
import { left, right } from '@shared/either'

@injectable()
export class ListUserContactsOperator extends AbstractOperator<InputListUserContacts, OutputListUserContacts> {
  public constructor(@inject(ListUserContactsUseCase) private listUserContactsUseCase: ListUserContactsUseCase) {
    super()
  }

  protected async run(input: InputListUserContacts): Promise<OutputListUserContacts> {
    const result = await this.listUserContactsUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
