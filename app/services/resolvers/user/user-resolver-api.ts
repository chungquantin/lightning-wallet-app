import { request } from "graphql-request"
import { Login, LoginDto, Register, RegisterDto } from "../../../generated/graphql"
import { LOGIN, REGISTER } from "./user.mutation"

export class UserResolverAPI {
  private url = "http://192.168.1.102:3000/graphql"

  public async login(dto: LoginDto): Promise<Login> {
    try {
      const response = await request<{ login: Login }, { loginData: LoginDto }>(this.url, LOGIN, {
        loginData: dto,
      })
      return response.login
    } catch (error) {
      throw error
    }
  }

  public async register(dto: RegisterDto): Promise<Register> {
    try {
      const response = await request<{ register: Register }, { registerData: RegisterDto }>(
        this.url,
        REGISTER,
        { registerData: dto },
      )
      return response.register
    } catch (error) {
      throw error.message
    }
  }
}
