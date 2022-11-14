import bcrypt from 'bcrypt'

export class HandlePassword {
  private readonly saltRounds = 10

  public hashPassword(plaintextPassword: string): string {
    const salt = bcrypt.genSaltSync(this.saltRounds)

    return bcrypt.hashSync(plaintextPassword, salt)
  }
}
