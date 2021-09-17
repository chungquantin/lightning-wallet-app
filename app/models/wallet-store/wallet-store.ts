import { Instance, isAlive, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import _ from "underscore"
import { GetMeWallet } from "../../generated/graphql"
import { WalletModel, WalletSnapshot } from "../wallet/wallet"
import { WalletResolverApi } from "../../services/resolvers"

export const WalletStoreModel = types
  .model("WalletStore")
  .props({
    wallet: types.optional(WalletModel, {}),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveWallet: (walletSnapshot: WalletSnapshot) => {
      if (isAlive(self.wallet)) {
        self.wallet = walletSnapshot
      }
    },
  }))
  .actions((self) => ({
    fetchCurrentUserWallet: async function () {
      console.log("WalletStore - FetchCurrentUserWallet")
      const walletApi = new WalletResolverApi()
      const result = await walletApi.getCurrentUserWallet()

      if (result.success) {
        // store token
        self.saveWallet(result.data)
      } else {
        __DEV__ && console.tron.log(result.errors)
      }
      return result as GetMeWallet
    },
  }))

type WalletStoreType = Instance<typeof WalletStoreModel>
export interface WalletStore extends WalletStoreType {}
type WalletStoreSnapshotType = SnapshotOut<typeof WalletStoreModel>
export interface WalletStoreSnapshot extends WalletStoreSnapshotType {}
export const createWalletStoreDefaultModel = () => types.optional(WalletStoreModel, {})
