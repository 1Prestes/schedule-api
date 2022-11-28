import jwt from 'jsonwebtoken'

export class HandleJWT {
  private readonly privateKey = process.env.SECRET_KEY

  public generateToken(iduser: string): string {
    return jwt.sign({ iduser }, this.privateKey, { expiresIn: 60 * 60 })
  }
}
