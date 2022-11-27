import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { DeleteGroupUseCase } from '@business/useCases/groups/deleteGroupUseCase'
import { InputDeleteGroup } from '@controller/serializers/groups/inputDeleteGroup'
import { OutputDeleteGroup } from '@controller/serializers/groups/outputDeleteGroup'
import { left, right } from '@shared/either'

@injectable()
export class DeleteGroupOperator extends AbstractOperator<InputDeleteGroup, OutputDeleteGroup> {
  public constructor(@inject(DeleteGroupUseCase) private deleteGroupUseCase: DeleteGroupUseCase) {
    super()
  }

  protected async run(input: InputDeleteGroup): Promise<OutputDeleteGroup> {
    const result = await this.deleteGroupUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
