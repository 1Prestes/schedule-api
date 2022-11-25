import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { FindEventUseCase } from '@business/useCases/events/findEventUseCase'
import { InputFindEvent } from '@controller/serializers/events/inputFindEvent'
import { OutputFindEvent } from '@controller/serializers/events/outputFindEvent'
import { left, right } from '@shared/either'

@injectable()
export class FindEventOperator extends AbstractOperator<InputFindEvent, OutputFindEvent> {
  public constructor(@inject(FindEventUseCase) private findEventUseCase: FindEventUseCase) {
    super()
  }

  protected async run(input: InputFindEvent): Promise<OutputFindEvent> {
    const result = await this.findEventUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
