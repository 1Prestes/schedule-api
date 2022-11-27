import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { RemoveContactFromEventUseCase } from '@business/useCases/eventContacts/removeContactFromEventUseCase'
import { InputRemoveContactFromEvent } from '@controller/serializers/eventContacts/inputRemoveContactFromEvent'
import { OutputRemoveContactFromEvent } from '@controller/serializers/eventContacts/outputRemoveContactFromEvent'
import { left, right } from '@shared/either'

@injectable()
export class RemoveContactFromEventOperator extends AbstractOperator<
  InputRemoveContactFromEvent,
  OutputRemoveContactFromEvent
> {
  public constructor(
    @inject(RemoveContactFromEventUseCase) private removeContactFromEventUseCase: RemoveContactFromEventUseCase
  ) {
    super()
  }

  protected async run(input: InputRemoveContactFromEvent): Promise<OutputRemoveContactFromEvent> {
    const result = await this.removeContactFromEventUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
