import bcrypt from 'bcrypt'

interface ICompare {
  plaintextPassword: string
  hash: string
}

export class HandlePassword {
  private readonly saltRounds = 10

  public hashPassword(plaintextPassword: string): string {
    const salt = bcrypt.genSaltSync(this.saltRounds)

    return bcrypt.hashSync(plaintextPassword, salt)
  }

  public compare({ plaintextPassword, hash }: ICompare): string {
    return bcrypt.compareSync(plaintextPassword, hash)
  }
}
