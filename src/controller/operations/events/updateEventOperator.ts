import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { UpdateEventUseCase } from '@business/useCases/events/updateEventUseCase'
import { InputUpdateEvent } from '@controller/serializers/events/inputUpdateEvent'
import { OutputUpdateEvent } from '@controller/serializers/events/outputUpdateEvent'
import { left, right } from '@shared/either'

@injectable()
export class UpdateEventOperator extends AbstractOperator<InputUpdateEvent, OutputUpdateEvent> {
  public constructor(@inject(UpdateEventUseCase) private updateEventUseCase: UpdateEventUseCase) {
    super()
  }

  protected async run(input: InputUpdateEvent): Promise<OutputUpdateEvent> {
    const result = await this.updateEventUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
