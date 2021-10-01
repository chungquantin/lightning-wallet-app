import { STORAGE_KEY } from "../../../constants/AsyncStorageKey"
import {
  ConnectBankAccount,
  ConnectBankAccountDto,
  GetMyBankAccounts,
  PlaidCreateLinkToken,
} from "../../../generated/graphql"
import { loadString } from "../../../utils/storage"
import { API_URL, PRODUCTION_API_URL, useGateway } from "../constants"
import { ResolverApi } from "../resolver"

export class BankResolverApi extends ResolverApi {
  constructor() {
    super()
    this.url = PRODUCTION_API_URL
      ? PRODUCTION_API_URL
      : !useGateway
      ? `${API_URL}:3002`
      : `${API_URL}:3000/graphql`
  }

  public async getMyBankAccounts(): Promise<GetMyBankAccounts> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.query<GetMyBankAccounts, {}>(
      "getMyBankAccounts",
      {},
      {
        accessToken,
        refreshToken,
      },
    )
    return res.getMyBankAccounts
  }

  public async connectBankAccount(args: ConnectBankAccountDto): Promise<ConnectBankAccount> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.mutation<ConnectBankAccount, ConnectBankAccountDto>(
      "connectBankAccount",
      {
        data: args,
      },
      {
        accessToken,
        refreshToken,
      },
    )
    return res.connectBankAccount
  }

  public async plaidCreateLinkToken(): Promise<PlaidCreateLinkToken> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.mutation<PlaidCreateLinkToken, {}>(
      "createLinkToken",
      {},
      {
        accessToken,
        refreshToken,
      },
    )
    return res.createLinkToken
  }
}
