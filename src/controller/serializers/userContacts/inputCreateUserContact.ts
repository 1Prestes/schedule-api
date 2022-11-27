import { IsOptional, IsEmail, IsString, IsBoolean } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputCreateUserContact extends Validatable<InputCreateUserContact> {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsBoolean()
  primaryEmail?: boolean

  @IsOptional()
  @IsBoolean()
  primaryPhone?: boolean

  @IsOptional()
  @IsString()
  iduser?: string

  @IsOptional()
  @IsString()
  idcontact?: string
}
