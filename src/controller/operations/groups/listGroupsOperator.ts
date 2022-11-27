import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { ListGroupsUseCase } from '@business/useCases/groups/listGroupsUseCase'
import { InputListGroups } from '@controller/serializers/groups/inputListGroups'
import { OutputListGroups } from '@controller/serializers/groups/outputListGroups'
import { left, right } from '@shared/either'

@injectable()
export class ListGroupsOperator extends AbstractOperator<InputListGroups, OutputListGroups> {
  public constructor(@inject(ListGroupsUseCase) private listGroupsUseCase: ListGroupsUseCase) {
    super()
  }

  protected async run(input: InputListGroups): Promise<OutputListGroups> {
    const result = await this.listGroupsUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
