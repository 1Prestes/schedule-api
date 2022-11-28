import { IsNotEmpty, IsString } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputFindUser extends Validatable<InputFindUser> {
  @IsNotEmpty()
  @IsString()
  iduser!: string
}
