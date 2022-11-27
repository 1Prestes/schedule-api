import { IsNotEmpty, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputListContactsFromGroup extends Validatable<InputListContactsFromGroup> {
  @IsNotEmpty()
  @IsUUID()
  iduser!: string

  @IsNotEmpty()
  @IsUUID()
  idgroup!: string
}
