import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputListUserContacts extends Validatable<InputListUserContacts> {
  @IsNotEmpty()
  @IsUUID()
  id!: string

  @IsOptional()
  @IsString()
  limit?: number

  @IsOptional()
  @IsString()
  page?: number

  @IsNotEmpty()
  @IsBoolean()
  isOwner!: boolean
}
