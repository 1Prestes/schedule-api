import { IsString, IsNotEmpty, IsUUID, IsDateString } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputCreateEvent extends Validatable<InputCreateEvent> {
  @IsNotEmpty()
  @IsString()
  title!: string

  @IsNotEmpty()
  @IsString()
  description!: string

  @IsNotEmpty()
  @IsDateString()
  initialDate!: Date

  @IsNotEmpty()
  @IsDateString()
  finalDate!: Date

  @IsNotEmpty()
  @IsString()
  place!: string

  @IsNotEmpty()
  @IsUUID()
  iduser!: string
}
