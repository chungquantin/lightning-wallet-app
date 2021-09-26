import { request } from "graphql-request"
import { STORAGE_KEY } from "../../../constants/AsyncStorageKey"
import { PlaidCreateLinkToken } from "../../../generated/graphql"
import { loadString } from "../../../utils/storage"
import { API_URL, PRODUCTION_API_URL, useGateway } from "../constants"
import { CREATE_LINK_TOKEN } from "./bank.mutation"

export class BankResolverApi {
  private url = PRODUCTION_API_URL
    ? PRODUCTION_API_URL
    : !useGateway
    ? `${API_URL}:3002`
    : `${API_URL}:3000/graphql`

  public async plaidCreateLinkToken(): Promise<PlaidCreateLinkToken> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        loadString(STORAGE_KEY.ACCESS_TOKEN),
        loadString(STORAGE_KEY.REFRESH_TOKEN),
      ])

      const response = await request<{ createLinkToken: PlaidCreateLinkToken }>(
        this.url,
        CREATE_LINK_TOKEN,
        {},
        {
          "x-access-token": accessToken,
          "x-refresh-token": refreshToken,
        },
      )

      return response.createLinkToken
    } catch (error) {
      console.log(error)
      throw error.message
    }
  }
}
