import { request } from "graphql-request"
import { STORAGE_KEY } from "../../../constants/AsyncStorageKey"
import {
  ConnectBankAccount,
  ConnectBankAccountDto,
  ExchangeTokenDto,
  GetMyBankAccounts,
  PlaidCreateLinkToken,
  PlaidExchangePublicToken,
} from "../../../generated/graphql"
import { loadString } from "../../../utils/storage"
import { API_URL, PRODUCTION_API_URL, useGateway } from "../constants"
import { CONNECT_BANK_ACCOUNT_MUTATION, CREATE_LINK_TOKEN } from "./bank.mutation"
import { EXCHANGE_PUBLIC_TOKEN, GET_MY_BANK_ACCOUNTS_QUERY } from "./bank.query"

export class BankResolverApi {
  private url = PRODUCTION_API_URL
    ? PRODUCTION_API_URL
    : !useGateway
    ? `${API_URL}:3002`
    : `${API_URL}:3000/graphql`

  public async getMyBankAccounts(): Promise<GetMyBankAccounts> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        loadString(STORAGE_KEY.ACCESS_TOKEN),
        loadString(STORAGE_KEY.REFRESH_TOKEN),
      ])

      const response = await request<{ getMyBankAccounts: GetMyBankAccounts }>(
        this.url,
        GET_MY_BANK_ACCOUNTS_QUERY,
        {},
        {
          "x-access-token": accessToken,
          "x-refresh-token": refreshToken,
        },
      )

      return response.getMyBankAccounts
    } catch (error) {
      console.log(error)
      throw error.message
    }
  }

  public async connectBankAccount(args: ConnectBankAccountDto): Promise<ConnectBankAccount> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        loadString(STORAGE_KEY.ACCESS_TOKEN),
        loadString(STORAGE_KEY.REFRESH_TOKEN),
      ])

      const response = await request<
        { connectBankAccount: ConnectBankAccount },
        { connectBankAccountData: ConnectBankAccountDto }
      >(
        this.url,
        CONNECT_BANK_ACCOUNT_MUTATION,
        {
          connectBankAccountData: args,
        },
        {
          "x-access-token": accessToken,
          "x-refresh-token": refreshToken,
        },
      )

      return response.connectBankAccount
    } catch (error) {
      console.log(error)
      throw error.message
    }
  }

  public async plaidExchangePublicToken(publicToken: string): Promise<PlaidExchangePublicToken> {
    try {
      const response = await request<
        { exchangePublicToken: PlaidExchangePublicToken },
        { exchangePublicTokenData: ExchangeTokenDto }
      >(this.url, EXCHANGE_PUBLIC_TOKEN, {
        exchangePublicTokenData: {
          publicToken,
        },
      })

      return response.exchangePublicToken
    } catch (error) {
      console.log(error)
      throw error.message
    }
  }

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
