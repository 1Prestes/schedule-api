import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputListEvents extends Validatable<InputListEvents> {
  @IsNotEmpty()
  @IsUUID()
  iduser!: string

  @IsOptional()
  @IsString()
  limit?: number

  @IsOptional()
  @IsString()
  page?: number
}
