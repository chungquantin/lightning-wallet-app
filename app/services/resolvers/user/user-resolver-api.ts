import { request } from "graphql-request"
import { Login, LoginDto, Register, RegisterDto } from "../../../generated/graphql"
import { LOGIN } from "./user.mutation"

export class UserResolverAPI {
  private url = "http://localhost:3000/graphql"

  public async login({ email, password }: LoginDto): Promise<Login> {
    try {
      const response = await request(this.url, LOGIN, {
        email,
        password,
      })
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async register({
    avatar,
    firstName,
    lastName,
    password,
    email,
    phoneNumber,
  }: RegisterDto): Promise<Register> {
    try {
      const response = await request(this.url, LOGIN, {
        email,
        password,
        avatar,
        firstName,
        lastName,
        phoneNumber,
      })
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
