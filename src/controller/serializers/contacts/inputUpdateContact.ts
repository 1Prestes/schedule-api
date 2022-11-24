import { IsNotEmpty, IsString, IsDate, IsOptional, IsUUID, MinLength } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputUpdateContact extends Validatable<InputUpdateContact> {
  @IsNotEmpty()
  @IsUUID()
  id!: string

  @IsNotEmpty()
  @IsUUID()
  iduser!: string

  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string

  @IsOptional()
  @IsDate()
  birthDate?: Date

  @IsOptional()
  @IsString()
  @MinLength(5)
  address?: string
}
