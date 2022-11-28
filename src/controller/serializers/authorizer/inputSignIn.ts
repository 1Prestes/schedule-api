import { IsNotEmpty, IsString, MinLength } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputSignIn extends Validatable<InputSignIn> {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username!: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string
}
