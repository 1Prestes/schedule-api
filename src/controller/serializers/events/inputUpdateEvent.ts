import { IsNotEmpty, IsString, IsDateString, IsUUID, IsOptional } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputUpdateEvent extends Validatable<InputUpdateEvent> {
  @IsNotEmpty()
  @IsUUID()
  idevent!: string

  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsDateString()
  initialDate?: Date

  @IsOptional()
  @IsDateString()
  finalDate?: Date

  @IsOptional()
  @IsString()
  place?: string

  @IsNotEmpty()
  @IsUUID()
  iduser!: string
}
