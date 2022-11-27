import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator'

import { Validatable } from '../abstractValidatable'

export class InputCreateGroup extends Validatable<InputCreateGroup> {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title!: string

  @IsNotEmpty()
  @IsUUID()
  iduser!: string
}
