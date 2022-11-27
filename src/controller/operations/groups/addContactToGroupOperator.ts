import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { AddContactToGroupUseCase } from '@business/useCases/groups/addContactToGroupUseCase'
import { InputAddContactToGroup } from '@controller/serializers/groups/inputAddContactToGroup'
import { OutputAddContactToGroup } from '@controller/serializers/groups/outputAddContactToGroup'
import { left, right } from '@shared/either'

@injectable()
export class AddContactToGroupOperator extends AbstractOperator<InputAddContactToGroup, OutputAddContactToGroup> {
  public constructor(@inject(AddContactToGroupUseCase) private addContactToGroupUseCase: AddContactToGroupUseCase) {
    super()
  }

  protected async run(input: InputAddContactToGroup): Promise<OutputAddContactToGroup> {
    const result = await this.addContactToGroupUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
