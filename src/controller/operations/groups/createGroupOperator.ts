import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { CreateGroupUseCase } from '@business/useCases/groups/createGroupsUseCase'
import { InputCreateGroup } from '@controller/serializers/groups/inputCreateGroup'
import { OutputCreateGroup } from '@controller/serializers/groups/outputCreateGroup'
import { left, right } from '@shared/either'

@injectable()
export class CreateGroupOperator extends AbstractOperator<InputCreateGroup, OutputCreateGroup> {
  public constructor(@inject(CreateGroupUseCase) private createGroupUseCase: CreateGroupUseCase) {
    super()
  }

  protected async run(input: InputCreateGroup): Promise<OutputCreateGroup> {
    const result = await this.createGroupUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
