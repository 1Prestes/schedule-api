import { IsNotEmpty, IsString, IsDate } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputCreateUser extends Validatable<InputCreateUser> {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsDate()
  birthDate!: Date

  @IsNotEmpty()
  @IsString()
  username!: string

  @IsNotEmpty()
  @IsString()
  password!: string

  @IsNotEmpty()
  @IsString()
  address?: string
}
