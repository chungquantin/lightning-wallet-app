import { request } from "graphql-request"
import { GetMeWallet } from "../../../generated/graphql"
import { STORAGE_KEY } from "../../../models/constants/AsyncStorageKey"
import { loadString } from "../../../utils/storage"
import { useGateway } from "../constants"
import { GET_CURRENT_USER_WALLET } from "./wallet.query"

export class WalletResolverApi {
  private url = useGateway ? "http://192.168.1.107:3004" : "http://192.168.1.107:3000/graphql"

  public async getCurrentUserWallet(): Promise<any> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        loadString(STORAGE_KEY.ACCESS_TOKEN),
        loadString(STORAGE_KEY.REFRESH_TOKEN),
      ])

      const response = await request<{ getMyWallet: GetMeWallet }>(
        this.url,
        GET_CURRENT_USER_WALLET,
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
