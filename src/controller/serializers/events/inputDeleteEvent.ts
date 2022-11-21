import { IsNotEmpty, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputDeleteEvent extends Validatable<InputDeleteEvent> {
  @IsNotEmpty()
  @IsUUID()
  idevent!: string

  @IsNotEmpty()
  @IsUUID()
  iduser!: string
}
