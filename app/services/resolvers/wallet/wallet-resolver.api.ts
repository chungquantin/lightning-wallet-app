import { request } from "graphql-request"
import { GetMeWallet } from "../../../generated/graphql"
import { STORAGE_KEY } from "../../../models/constants/AsyncStorageKey"
import { loadString } from "../../../utils/storage"
import { API_URL, PRODUCTION_API_URL, useGateway } from "../constants"
import { GET_CURRENT_USER_WALLET_QUERY } from "./wallet.query"

export class WalletResolverApi {
  private url = PRODUCTION_API_URL
    ? PRODUCTION_API_URL
    : !useGateway
    ? `${API_URL}:3001`
    : `${API_URL}:3000/graphql`

  public async getCurrentUserWallet(): Promise<any> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        loadString(STORAGE_KEY.ACCESS_TOKEN),
        loadString(STORAGE_KEY.REFRESH_TOKEN),
      ])

      const response = await request<{ getMyWallet: GetMeWallet }>(
        this.url,
        GET_CURRENT_USER_WALLET_QUERY,
        {},
        {
          "x-access-token": accessToken,
          "x-refresh-token": refreshToken,
        },
      )

      return response.getMyWallet
    } catch (error) {
      console.log(error)
      throw error.message
    }
  }
}
