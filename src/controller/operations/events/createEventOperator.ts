import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { InputCreateEvent } from '@controller/serializers/events/inputCreateEvent'
import { OutputCreateEvent } from '@controller/serializers/events/outputCreateEvent'
import { CreateEventUseCase } from '@business/useCases/events/createEventUseCase'
import { left, right } from '@shared/either'

@injectable()
export class CreateEventOperator extends AbstractOperator<InputCreateEvent, OutputCreateEvent> {
  public constructor(@inject(CreateEventUseCase) private createEventUseCase: CreateEventUseCase) {
    super()
  }

  protected async run(input: InputCreateEvent): Promise<OutputCreateEvent> {
    const result = await this.createEventUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
