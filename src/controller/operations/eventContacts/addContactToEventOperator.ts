import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { AddContactToEventUseCase } from '@business/useCases/eventContacts/addContactToEventUseCase'
import { InputAddContactToEvent } from '@controller/serializers/eventContacts/inputAddContactToEvent'
import { OutputAddContactToEvent } from '@controller/serializers/eventContacts/outputAddContactToEvent'
import { left, right } from '@shared/either'

@injectable()
export class AddContactToEventOperator extends AbstractOperator<InputAddContactToEvent, OutputAddContactToEvent> {
  public constructor(@inject(AddContactToEventUseCase) private addContactToEventUseCase: AddContactToEventUseCase) {
    super()
  }

  protected async run(input: InputAddContactToEvent): Promise<OutputAddContactToEvent> {
    const result = await this.addContactToEventUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
