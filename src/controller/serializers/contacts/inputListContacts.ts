import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputListContacts extends Validatable<InputListContacts> {
  @IsOptional()
  @IsString()
  limit?: number

  @IsOptional()
  @IsString()
  page?: number

  @IsNotEmpty()
  @IsUUID()
  iduser!: string
}
