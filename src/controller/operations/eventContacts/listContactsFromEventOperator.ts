import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { ListContactsFromEventUseCase } from '@business/useCases/eventContacts/listContactsFromEventUseCase'
import { InputListContactsFromEvent } from '@controller/serializers/eventContacts/inputListContactsFromEvent'
import { OutputListContactsFromEvent } from '@controller/serializers/eventContacts/outputListContactsFromEvent'
import { left, right } from '@shared/either'

@injectable()
export class ListContactsFromEventOperator extends AbstractOperator<
  InputListContactsFromEvent,
  OutputListContactsFromEvent
> {
  public constructor(
    @inject(ListContactsFromEventUseCase) private listContactsFromEventUseCase: ListContactsFromEventUseCase
  ) {
    super()
  }

  protected async run(input: InputListContactsFromEvent): Promise<OutputListContactsFromEvent> {
    const result = await this.listContactsFromEventUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
