import { IsOptional, IsEmail, IsString, IsBoolean, IsNotEmpty } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputUpdateUserContact extends Validatable<InputUpdateUserContact> {
  @IsNotEmpty()
  @IsString()
  id!: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsNotEmpty()
  @IsBoolean()
  primaryEmail!: boolean

  @IsNotEmpty()
  @IsBoolean()
  primaryPhone!: boolean

  @IsOptional()
  @IsString()
  iduser?: string

  @IsOptional()
  @IsString()
  idcontact?: string
}
