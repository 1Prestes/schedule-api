import { IsOptional, IsString } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputListUsers extends Validatable<InputListUsers> {
  @IsOptional()
  @IsString()
  limit?: number

  @IsOptional()
  @IsString()
  page?: number
}
