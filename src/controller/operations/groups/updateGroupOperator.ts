import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { UpdateGroupUseCase } from '@business/useCases/groups/updateGroupsUseCase'
import { InputUpdateGroup } from '@controller/serializers/groups/inputUpdateGroup'
import { OutputUpdateGroup } from '@controller/serializers/groups/outputUpdateGroup'
import { left, right } from '@shared/either'

@injectable()
export class UpdateGroupOperator extends AbstractOperator<InputUpdateGroup, OutputUpdateGroup> {
  public constructor(@inject(UpdateGroupUseCase) private updateGroupUseCase: UpdateGroupUseCase) {
    super()
  }

  protected async run(input: InputUpdateGroup): Promise<OutputUpdateGroup> {
    const result = await this.updateGroupUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
