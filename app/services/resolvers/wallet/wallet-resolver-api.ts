import {
  CancelPaymentRequest,
  GetMeWallet,
  GetMyPaymentRequests,
  GetMyWalletTransactions,
  GetPaymentRequest,
  GetWallet,
  GetWalletDto,
  RespondPaymentRequest,
  SendInAppLightningPayment,
  SendInAppPayment,
  SendOutAppLightningPayment,
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
      ? `${API_URL}:3004`
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
      "getMyWallet",
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
      "getMyWalletTransactions",
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
    return res.getMyWalletTransactions
  }

  public async getMyPaymentRequests({
    limit,
    skip,
  }: Partial<{
    limit: number
    skip: number
  }>): Promise<GetMyPaymentRequests> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.query<GetMyPaymentRequests, {}>(
      "getMyPaymentRequests",
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
    return res.getMyPaymentRequests
  }

  public async getPaymentRequest(): Promise<GetPaymentRequest> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.query<GetPaymentRequest, {}>(
      "getPaymentRequest",
      {},
      {
        accessToken,
        refreshToken,
      },
    )
    return res.getPaymentRequest
  }

  public async cancelPaymentRequest(): Promise<CancelPaymentRequest> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.mutation<CancelPaymentRequest, {}>(
      "cancelPaymentRequest",
      {},
      {
        accessToken,
        refreshToken,
      },
    )
    return res.cancelPaymentRequest
  }

  public async respondPaymentRequest(): Promise<RespondPaymentRequest> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.mutation<RespondPaymentRequest, {}>(
      "cancelPaymentRequest",
      {},
      {
        accessToken,
        refreshToken,
      },
    )
    return res.respondPaymentRequest
  }

  public async sendInAppLightningPayment(): Promise<SendInAppLightningPayment> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.mutation<SendInAppLightningPayment, {}>(
      "sendInAppLightningPayment",
      {},
      {
        accessToken,
        refreshToken,
      },
    )
    return res.sendInAppLightningPayment
  }

  public async sendInAppPayment(): Promise<SendInAppPayment> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.mutation<SendInAppPayment, {}>(
      "sendInAppPayment",
      {},
      {
        accessToken,
        refreshToken,
      },
    )
    return res.sendInAppLightningPayment
  }

  public async sendOutAppLightningPayment(): Promise<SendOutAppLightningPayment> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.mutation<SendOutAppLightningPayment, {}>(
      "sendOutAppLightningPayment",
      {},
      {
        accessToken,
        refreshToken,
      },
    )
    return res.sendOutAppLightningPayment
  }
}
