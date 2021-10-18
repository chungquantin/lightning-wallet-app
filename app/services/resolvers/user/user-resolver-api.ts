import {
  AddNewContact,
  AddNewContactDto,
  GetMyContacts,
  GetUser,
  GetUserDto,
  Login,
  LoginDto,
  Me,
  Register,
  RegisterDto,
  SearchUser,
  SearchUserDto,
} from "../../../generated/graphql"
import { STORAGE_KEY } from "../../../constants/AsyncStorageKey"
import { loadString } from "../../../utils/storage"
import { API_URL, PRODUCTION_API_URL, useGateway } from "../constants"
import { ResolverApi } from "../resolver"

export class UserResolverAPI extends ResolverApi {
  constructor() {
    super()
    this.url = PRODUCTION_API_URL
      ? PRODUCTION_API_URL
      : !useGateway
      ? `${API_URL}:3001`
      : `${API_URL}:3000/graphql`
  }

  public async login(dto: LoginDto): Promise<Login> {
    console.log(this.url)
    const res = await this.mutation<Login, LoginDto>("login", {
      data: { email: dto.email, password: dto.password },
    })
    return res.login
  }

  public async register(dto: RegisterDto): Promise<Register> {
    const res = await this.mutation<Register, RegisterDto>("register", {
      data: dto,
    })
    return res.register
  }

  public async getCurrentUser(): Promise<Me> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.query<Me, {}>(
      "getCurrentUser",
      {},
      {
        accessToken,
        refreshToken,
      },
    )
    return res.getCurrentUser
  }

  public async getMyContacts(): Promise<GetMyContacts> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.query<GetMyContacts, {}>(
      "getMyContacts",
      {},
      {
        accessToken,
        refreshToken,
      },
    )
    return res.getMyContacts
  }

  public async getUser(userId: string): Promise<GetUser> {
    const res = await this.query<GetUser, GetUserDto>("getUser", {
      data: {
        userId,
      },
    })
    return res.getUser
  }

  public async addNewContact(userId: string): Promise<AddNewContact> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.mutation<AddNewContact, AddNewContactDto>(
      "addNewContact",
      {
        data: {
          userId,
        },
      },
      {
        accessToken,
        refreshToken,
      },
    )
    return res.addNewContact
  }

  public async searchUser(searchInput: string): Promise<SearchUser> {
    const res = await this.query<SearchUser, SearchUserDto>("searchUser", {
      data: {
        searchInput,
      },
    })
    return res.searchUser
  }
}
