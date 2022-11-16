import { injectable, inject } from 'inversify'

import { AbstractOperator } from '../abstractOperator'
import { DeleteUserContactUseCase } from '@business/useCases/userContacts/deleteUserContactUseCase'
import { InputDeleteUserContact } from '@controller/serializers/userContacts/inputDeleteUserContact'
import { OutputDeleteUserContact } from '@controller/serializers/userContacts/outputDeleteUserContact'
import { left, right } from '@shared/either'

@injectable()
export class DeleteUserContactOperator extends AbstractOperator<InputDeleteUserContact, OutputDeleteUserContact> {
  public constructor(@inject(DeleteUserContactUseCase) private deleteUserContactUseCase: DeleteUserContactUseCase) {
    super()
  }

  protected async run(input: InputDeleteUserContact): Promise<OutputDeleteUserContact> {
    const result = await this.deleteUserContactUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
