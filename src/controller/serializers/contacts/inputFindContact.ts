import { IsNotEmpty, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputFindContact extends Validatable<InputFindContact> {
  @IsNotEmpty()
  @IsUUID()
  id!: string
}
