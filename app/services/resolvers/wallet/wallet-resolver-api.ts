import {
  GetMeWallet,
  GetMyWalletTransactions,
  GetWallet,
  GetWalletDto,
} from "../../../generated/graphql"
import { STORAGE_KEY } from "../../../constants/AsyncStorageKey"
import { loadString } from "../../../utils/storage"
import { API_URL, PRODUCTION_API_URL, useGateway } from "../constants"
import { ResolverApi } from "../resolver"

export class WalletResolverApi extends ResolverApi {
  constructor() {
    super()
    this.url = PRODUCTION_API_URL
      ? PRODUCTION_API_URL
      : !useGateway
      ? `${API_URL}:3001`
      : `${API_URL}:3000/graphql`
  }

  public async getWallet(walletId: string): Promise<GetWallet> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.query<GetWallet, GetWalletDto>(
      "getWallet",
      {
        data: {
          walletId,
        },
      },
      {
        accessToken,
        refreshToken,
      },
    )
    return res.getWallet
  }

  public async getCurrentUserWallet(): Promise<GetMeWallet> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.query<GetMeWallet, {}>(
      "getWallet",
      {},
      {
        accessToken,
        refreshToken,
      },
    )
    return res.getMyWallet
  }

  public async getMyWalletTransactions({
    limit,
    skip,
  }: Partial<{
    limit: number
    skip: number
  }>): Promise<GetMyWalletTransactions> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.query<GetMyWalletTransactions, {}>(
      "getWallet",
      {
        Pagination: {
          limit,
          skip,
        },
      },
      {
        accessToken,
        refreshToken,
      },
    )
    return res.getMyWallet
  }
}
