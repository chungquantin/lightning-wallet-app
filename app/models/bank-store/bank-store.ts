import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { BankResolverApi } from "../../services/resolvers"
import { PlaidCreateLinkToken } from "../../generated/graphql"

export const BankStoreModel = types
  .model("BankStore")
  .extend(withEnvironment)
  .props({
    linkToken: types.optional(types.string, ""),
  })
  .actions((self) => {
    return {
      saveLinkToken: (linkToken: string) => (self.linkToken = linkToken),
    }
  })
  .actions((self) => {
    return {
      fetchLinkToken: flow(function* () {
        console.log("BankStore - FetchLinkToken")
        try {
          const bankApi = new BankResolverApi()
          const result: PlaidCreateLinkToken = yield bankApi.plaidCreateLinkToken()

          if (!result.success) {
            __DEV__ && console.tron.log(result.errors)
          } else {
            self.saveLinkToken(result.data.link_token)
          }

          return result
        } catch (error) {
          console.tron.error(error.message, "fetchLinkToken")
          throw error
        }
      }),
    }
  })

type BankStoreType = Instance<typeof BankStoreModel>
export interface BankStore extends BankStoreType {}
type BankStoreSnapshotType = SnapshotOut<typeof BankStoreModel>
export interface BankStoreSnapshot extends BankStoreSnapshotType {}
export const createBankStoreDefaultModel = () => types.optional(BankStoreModel, {})
