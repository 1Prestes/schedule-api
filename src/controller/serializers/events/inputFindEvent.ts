import { IsNotEmpty, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputFindEvent extends Validatable<InputFindEvent> {
  @IsNotEmpty()
  @IsUUID()
  idevent!: string

  @IsNotEmpty()
  @IsUUID()
  iduser!: string
}
