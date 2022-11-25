import { IsNotEmpty, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputDeleteContact extends Validatable<InputDeleteContact> {
  @IsNotEmpty()
  @IsUUID()
  idcontact!: string

  @IsNotEmpty()
  @IsUUID()
  iduser!: string
}
