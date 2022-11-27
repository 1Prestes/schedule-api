import { IsNotEmpty, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputRemoveContactFromGroup extends Validatable<InputRemoveContactFromGroup> {
  @IsNotEmpty()
  @IsUUID()
  iduser!: string

  @IsNotEmpty()
  @IsUUID()
  idgroup!: string

  @IsNotEmpty()
  @IsUUID()
  idcontact!: string
}
