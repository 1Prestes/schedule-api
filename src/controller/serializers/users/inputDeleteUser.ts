import { IsNotEmpty, IsString } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputDeleteUser extends Validatable<InputDeleteUser> {
  @IsNotEmpty()
  @IsString()
  iduser!: string
}
