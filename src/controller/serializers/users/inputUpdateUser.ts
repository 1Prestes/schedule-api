import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputUpdateUser extends Validatable<InputUpdateUser> {
  @IsNotEmpty()
  @IsString()
  iduser!: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsDate()
  birthDate?: Date

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  confirmPassword?: string

  @IsOptional()
  @IsString()
  address?: string
}
