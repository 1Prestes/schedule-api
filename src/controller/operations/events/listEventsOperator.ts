import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { InputListEvents } from '@controller/serializers/events/inputListEvents'
import { OutputListEvents } from '@controller/serializers/events/outputListEvents'
import { ListEventsUseCase } from '@business/useCases/events/listEventsUseCase'
import { left, right } from '@shared/either'

@injectable()
export class ListEventsOperator extends AbstractOperator<InputListEvents, OutputListEvents> {
  public constructor(@inject(ListEventsUseCase) private createEventUseCase: ListEventsUseCase) {
    super()
  }

  protected async run(input: InputListEvents): Promise<OutputListEvents> {
    const result = await this.createEventUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
