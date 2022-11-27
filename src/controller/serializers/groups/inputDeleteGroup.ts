import { IsNotEmpty, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputDeleteGroup extends Validatable<InputDeleteGroup> {
  @IsNotEmpty()
  @IsUUID()
  idgroup!: string

  @IsNotEmpty()
  @IsUUID()
  iduser!: string
}
