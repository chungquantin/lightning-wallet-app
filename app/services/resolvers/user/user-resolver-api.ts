import { request } from "graphql-request"
import { Login, LoginDto, Me, Register, RegisterDto } from "../../../generated/graphql"
import { STORAGE_KEY } from "../../../models/constants/AsyncStorageKey"
import { loadString } from "../../../utils/storage"
import { useGateway } from "../constants"
import { LOGIN, REGISTER } from "./user.mutation"
import { GET_CURRENT_USER } from "./user.query"

export class UserResolverAPI {
  private url = useGateway ? "http://192.168.1.107:3001" : "http://192.168.1.107:3000/graphql"

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
  public async getCurrentUser(): Promise<Me> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        loadString(STORAGE_KEY.ACCESS_TOKEN),
        loadString(STORAGE_KEY.REFRESH_TOKEN),
      ])
      const response = await request<{ getCurrentUser: Me }>(
        this.url,
        GET_CURRENT_USER,
        {},
        {
          "x-access-token": accessToken,
          "x-refresh-token": refreshToken,
        },
      )
      return response.getCurrentUser
    } catch (error) {
      throw error.message
    }
  }
}
