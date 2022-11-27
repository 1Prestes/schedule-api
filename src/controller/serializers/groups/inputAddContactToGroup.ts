import { IsNotEmpty, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputAddContactToGroup extends Validatable<InputAddContactToGroup> {
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
