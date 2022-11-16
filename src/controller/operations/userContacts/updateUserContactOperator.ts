import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { UpdateUserContactUseCase } from '@business/useCases/userContacts/updateUserContactUseCase'
import { InputUpdateUserContact } from '@controller/serializers/userContacts/inputUpdateUserContact'
import { OutputUpdateUserContact } from '@controller/serializers/userContacts/outputUpdateUserContact'
import { left, right } from '@shared/either'

@injectable()
export class UpdateUserContactOperator extends AbstractOperator<InputUpdateUserContact, OutputUpdateUserContact> {
  public constructor(@inject(UpdateUserContactUseCase) private updateUserContactUseCase: UpdateUserContactUseCase) {
    super()
  }

  protected async run(input: InputUpdateUserContact): Promise<OutputUpdateUserContact> {
    const result = await this.updateUserContactUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
