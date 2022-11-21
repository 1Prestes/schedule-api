import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { DeleteEventUseCase } from '@business/useCases/events/deleteEventUseCase'
import { OutputDeleteEvent } from '@controller/serializers/events/outputDeleteEvent'
import { InputDeleteEvent } from '@controller/serializers/events/inputDeleteEvent'
import { left, right } from '@shared/either'

@injectable()
export class DeleteEventOperator extends AbstractOperator<InputDeleteEvent, OutputDeleteEvent> {
  public constructor(@inject(DeleteEventUseCase) private deleteEventUseCase: DeleteEventUseCase) {
    super()
  }

  protected async run(input: InputDeleteEvent): Promise<OutputDeleteEvent> {
    const result = await this.deleteEventUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
