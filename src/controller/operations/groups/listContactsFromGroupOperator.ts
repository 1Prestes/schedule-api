import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { ListContactsFromGroupUseCase } from '@business/useCases/groups/listContactsFromGroupUseCase'
import { InputListContactsFromGroup } from '@controller/serializers/groups/inputListContactsFromGroup'
import { OutputListContactsFromGroup } from '@controller/serializers/groups/outputListContactsFromGroup'
import { left, right } from '@shared/either'

@injectable()
export class ListContactsFromGroupOperator extends AbstractOperator<
  InputListContactsFromGroup,
  OutputListContactsFromGroup
> {
  public constructor(
    @inject(ListContactsFromGroupUseCase) private listContactsFromGroupUseCase: ListContactsFromGroupUseCase
  ) {
    super()
  }

  protected async run(input: InputListContactsFromGroup): Promise<OutputListContactsFromGroup> {
    const result = await this.listContactsFromGroupUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
