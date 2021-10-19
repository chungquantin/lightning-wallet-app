import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserResolverAPI, WalletResolverApi } from "../../services/resolvers"
import { setUndefinedAl } from "../../utils/misc"
import { withEnvironment } from "../extensions/with-environment"
import {
  RequestedTransaction,
  RequestedTransactionModel,
} from "../requested-transaction/requested-transaction"
import { User, UserModel } from "../user/user"

export const TransactionDetailStoreModel = types
  .model("TransactionDetailStore")
  .extend(withEnvironment)
  .props({
    sender: types.optional(UserModel, {}),
    receiver: types.optional(UserModel, {}),
    transactionRequest: types.optional(RequestedTransactionModel, {}),
  })
  .actions((self) => {
    return {
      saveSender: (sender: User) => (self.sender = sender),
      saveReceiver: (receiver: User) => (self.receiver = receiver),
      saveRequest: (transaction: RequestedTransaction) => (self.transactionRequest = transaction),
    }
  })
  .actions((self) => {
    return {
      clear() {
        setUndefinedAl(self.sender)
        setUndefinedAl(self.receiver)
      },
      fetchTransactionDetail: async function (transactionRequest: RequestedTransaction) {
        try {
          const sender = await this.fetchWalletOwner(transactionRequest.fromWalletId)
          self.saveSender(sender)
          const receiver = await this.fetchWalletOwner(transactionRequest.toWalletId)
          self.saveReceiver(receiver)

          return true
        } catch (error) {
          __DEV__ && console.tron.log(error)
          return false
        }
      },
      fetchWalletOwner: async function (walletId: string): Promise<User> {
        console.log("WalletStore - FetchWalletOwner")
        const wallet = await new WalletResolverApi().getWallet({ walletId })
        if (wallet.success) {
          const user = await new UserResolverAPI().getUser(wallet.data.userId)
          if (user.success) {
            return user.data
          } else {
            __DEV__ && console.tron.log(user.errors)
            return null
          }
        } else {
          __DEV__ && console.tron.log(wallet.errors)
          return null
        }
      },
    }
  })

type TransactionDetailStoreType = Instance<typeof TransactionDetailStoreModel>
export interface TransactionDetailStoreModel extends TransactionDetailStoreType {}
type TransactionDetailStoreSnapshotType = SnapshotOut<typeof TransactionDetailStoreModel>
export interface TransactionDetailStoreSnapshot extends TransactionDetailStoreSnapshotType {}
export const createTransactionDetailStoreDefaultModel = () =>
  types.optional(TransactionDetailStoreModel, {})
