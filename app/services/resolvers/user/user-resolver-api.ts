import { request } from "graphql-request"
import {
  GetMyContacts,
  GetUser,
  GetUserDto,
  Login,
  LoginDto,
  Me,
  Register,
  RegisterDto,
} from "../../../generated/graphql"
import { STORAGE_KEY } from "../../../constants/AsyncStorageKey"
import { loadString } from "../../../utils/storage"
import { API_URL, PRODUCTION_API_URL, useGateway } from "../constants"
import { LOGIN_MUTATION, REGISTER_MUTATION } from "./user.mutation"
import { GET_CURRENT_USER_CONTACTS, GET_CURRENT_USER_QUERY, GET_USER_QUERY } from "./user.query"

export class UserResolverAPI {
  private url = PRODUCTION_API_URL
    ? PRODUCTION_API_URL
    : !useGateway
    ? `${API_URL}:3001`
    : `${API_URL}:3000/graphql`

  public async login(dto: LoginDto): Promise<Login> {
    try {
      const response = await request<{ login: Login }, { loginData: LoginDto }>(
        this.url,
        LOGIN_MUTATION,
        {
          loginData: dto,
        },
      )
      return response.login
    } catch (error) {
      throw error
    }
  }

  public async register(dto: RegisterDto): Promise<Register> {
    try {
      const response = await request<{ register: Register }, { registerData: RegisterDto }>(
        this.url,
        REGISTER_MUTATION,
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
        GET_CURRENT_USER_QUERY,
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

  public async getMyContacts(): Promise<GetMyContacts> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        loadString(STORAGE_KEY.ACCESS_TOKEN),
        loadString(STORAGE_KEY.REFRESH_TOKEN),
      ])
      const response = await request<{ getMyContacts: GetMyContacts }>(
        this.url,
        GET_CURRENT_USER_CONTACTS,
        {},
        {
          "x-access-token": accessToken,
          "x-refresh-token": refreshToken,
        },
      )
      return response.getMyContacts
    } catch (error) {
      throw error.message
    }
  }

  public async getUser(userId: string): Promise<GetUser> {
    try {
      const response = await request<{ getUser: GetUser }, { getUserData: GetUserDto }>(
        this.url,
        GET_USER_QUERY,
        {
          getUserData: {
            userId,
          },
        },
      )
      return response.getUser
    } catch (error) {
      throw error.message
    }
  }
}
