import { IsNotEmpty, IsOptional, IsEmail, IsString } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputCreateUserContact extends Validatable<InputCreateUserContact> {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsString()
  default?: boolean

  @IsNotEmpty()
  @IsString()
  user_iduser!: string
}
