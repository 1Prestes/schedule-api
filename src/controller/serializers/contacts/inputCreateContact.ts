import { IsNotEmpty, IsString, IsDate, IsUUID } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputCreateContact extends Validatable<InputCreateContact> {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsDate()
  birthDate!: Date

  @IsNotEmpty()
  @IsString()
  address!: string

  @IsNotEmpty()
  @IsUUID()
  iduser!: string
}
