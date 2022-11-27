import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { RemoveContactFromGroupUseCase } from '@business/useCases/groups/removeContactFromGroupUseCase'
import { InputRemoveContactFromGroup } from '@controller/serializers/groups/inputRemoveContactFromGroup'
import { OutputRemoveContactFromGroup } from '@controller/serializers/groups/outputRemoveContactFromGroup'
import { left, right } from '@shared/either'

@injectable()
export class RemoveContactFromGroupOperator extends AbstractOperator<
  InputRemoveContactFromGroup,
  OutputRemoveContactFromGroup
> {
  public constructor(
    @inject(RemoveContactFromGroupUseCase) private removeContactFromGroupUseCase: RemoveContactFromGroupUseCase
  ) {
    super()
  }

  protected async run(input: InputRemoveContactFromGroup): Promise<OutputRemoveContactFromGroup> {
    const result = await this.removeContactFromGroupUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
