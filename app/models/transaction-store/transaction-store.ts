import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { TransactionModel, TransactionSnapshot } from "../transaction/transaction"
import { TransactionApi } from "../../services/api/transaction-api"
import { withEnvironment } from "../extensions/with-environment"

export const TransactionStoreModel = types
  .model("TransactionStore")
  .props({
    transactions: types.optional(types.array(TransactionModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveTransactions: (transactionSnapshots: TransactionSnapshot[]) => {
      self.transactions.replace(transactionSnapshots)
    },
  }))
  .actions((self) => ({
    fetchTransactions: flow(function* (){
      const transactionApi = new TransactionApi(self.environment.api)
      const result = yield transactionApi.getTransactions()

      if (result.kind === "ok") {
        self.saveTransactions(result.transactions)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))

type TransactionStoreType = Instance<typeof TransactionStoreModel>
export interface TransactionStore extends TransactionStoreType {}
type TransactionStoreSnapshotType = SnapshotOut<typeof TransactionStoreModel>
export interface TransactionStoreSnapshot extends TransactionStoreSnapshotType {}
export const createTransactionStoreDefaultModel = () => types.optional(TransactionStoreModel, {})
