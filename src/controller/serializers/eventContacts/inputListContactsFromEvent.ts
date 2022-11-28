import { IsNotEmpty, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputListContactsFromEvent extends Validatable<InputListContactsFromEvent> {
  @IsNotEmpty()
  @IsUUID()
  iduser!: string

  @IsNotEmpty()
  @IsUUID()
  idevent!: string
}
