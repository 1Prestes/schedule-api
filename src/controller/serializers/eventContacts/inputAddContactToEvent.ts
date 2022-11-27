import { IsNotEmpty, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputAddContactToEvent extends Validatable<InputAddContactToEvent> {
  @IsNotEmpty()
  @IsUUID()
  iduser!: string

  @IsNotEmpty()
  @IsUUID()
  idevent!: string

  @IsNotEmpty()
  @IsUUID()
  idcontact!: string
}
