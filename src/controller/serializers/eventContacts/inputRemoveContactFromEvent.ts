import { IsNotEmpty, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputRemoveContactFromEvent extends Validatable<InputRemoveContactFromEvent> {
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
