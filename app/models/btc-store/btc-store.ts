import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { BtcResolverApi } from "../../services/resolvers/btc/btc-resolver-api"
import {
  GenerateChainInvoice,
  GenerateLightningInvoice,
  GenerateLightningInvoiceDto,
} from "../../generated/graphql"

export const BtcStoreModel = types
  .model("BtcStore")
  .extend(withEnvironment)
  .props({
    lightningAddress: types.optional(types.string, ""),
    onchainAddress: types.optional(types.string, ""),
  })
  .actions((self) => {
    return {
      saveLightningAddress: (linkToken: string) => (self.lightningAddress = linkToken),
      saveOnchainAddress: (address: string) => (self.onchainAddress = address),
    }
  })
  .actions((self) => {
    return {
      reset: function () {
        try {
          console.log("UserStore - Logout")
          self.lightningAddress = ""
          self.onchainAddress = ""
        } catch (error) {
          console.tron.log(error.message)
        }
      },
      generateOnchainAddress: flow(function* () {
        console.log("BtcStore - GenerateOnchainAddress")
        try {
          const btcApi = new BtcResolverApi()
          const response: GenerateChainInvoice = yield btcApi.generateOnChainInvoice()
          if (response.success) {
            self.saveOnchainAddress(response.data.address)
          } else {
            __DEV__ && console.tron.log(response.errors)
          }
          return response
        } catch (error) {
          console.tron.error(error.message, "generateOnchainAddress")
          throw error
        }
      }),
      generateLightningAddress: flow(function* ({
        amount,
        currency,
        description,
      }: GenerateLightningInvoiceDto) {
        console.log("BtcStore - GenerateLightningAddress")
        try {
          const btcApi = new BtcResolverApi()
          const response: GenerateLightningInvoice = yield btcApi.generateLightningInvoice({
            amount,
            currency,
            description,
          })
          if (response.success) {
            self.saveOnchainAddress(response.data.payReq)
          } else {
            __DEV__ && console.tron.log(response.errors)
          }
          return response
        } catch (error) {
          console.tron.error(error.message, "generateLightningAddress")
          throw error
        }
      }),
    }
  })

type BtcStoreType = Instance<typeof BtcStoreModel>
export interface BtcStore extends BtcStoreType {}
type BtcStoreSnapshotType = SnapshotOut<typeof BtcStoreModel>
export interface BtcStoreSnapshot extends BtcStoreSnapshotType {}
export const createBtcStoreDefaultModel = () => types.optional(BtcStoreModel, {})
