import { STORAGE_KEY } from "../../../constants/AsyncStorageKey"
import {
  GenerateChainInvoice,
  GenerateLightningInvoice,
  GenerateLightningInvoiceDto,
} from "../../../generated/graphql"
import { loadString } from "../../../utils/storage"
import { API_URL, PRODUCTION_API_URL, useGateway } from "../constants"
import { ResolverApi } from "../resolver"

export class BtcResolverApi extends ResolverApi {
  constructor() {
    super()
    this.url = PRODUCTION_API_URL
      ? PRODUCTION_API_URL
      : !useGateway
      ? `${API_URL}:3003`
      : `${API_URL}:3000/graphql`
  }

  public async generateOnChainInvoice(): Promise<GenerateChainInvoice> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.mutation<GenerateChainInvoice, {}>(
      "generateOnChainInvoice",
      {},
      {
        accessToken,
        refreshToken,
      },
    )
    return res.generateOnChainInvoice
  }

  public async generateLightningInvoice(
    dto: GenerateLightningInvoiceDto,
  ): Promise<GenerateLightningInvoice> {
    const [accessToken, refreshToken] = await Promise.all([
      loadString(STORAGE_KEY.ACCESS_TOKEN),
      loadString(STORAGE_KEY.REFRESH_TOKEN),
    ])
    const res = await this.mutation<GenerateLightningInvoice, GenerateLightningInvoiceDto>(
      "generateLightningInvoice",
      {
        data: dto,
      },
      {
        accessToken,
        refreshToken,
      },
    )
    return res.generateLightningInvoice
  }
}
