import { IsNotEmpty, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputDeleteUserContact extends Validatable<InputDeleteUserContact> {
  @IsNotEmpty()
  @IsUUID()
  id!: string
}
