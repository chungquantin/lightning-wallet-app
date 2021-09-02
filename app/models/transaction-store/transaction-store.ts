import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Transaction, TransactionModel, TransactionSnapshot } from "../transaction/transaction"
import { TransactionApi } from "../../services/api/transaction-api"
import { withEnvironment } from "../extensions/with-environment"
import _ from "underscore"
import { getMonthFromUnix, getYearFromUnix, monthList } from "../../utils/date"

export const TransactionStoreModel = types
  .model("TransactionStore")
  .props({
    transactions: types.optional(types.array(TransactionModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get incomeTransactions() {
      return self.transactions.filter((transaction) => transaction.type === "IN")
    },
    get expenseTransactions() {
      return self.transactions.filter((transaction) => transaction.type === "OUT")
    },
    get incomeTransactionByMonthAndYear(): {
      month: string
      year: string
      data: Transaction[]
    }[] {
      return this.groupTransactionByMonthAndYear(this.incomeTransactions)
    },
    get expenseTransactionByMonthAndYear(): {
      month: string
      year: string
      data: Transaction[]
    }[] {
      return this.groupTransactionByMonthAndYear(this.expenseTransactions)
    },
    groupTransactionByMonthAndYear(transactions?: Transaction[]): {
      month: string
      year: string
      data: Transaction[]
    }[] {
      const transactionGroupedByAllMonth = _.groupBy(transactions || self.transactions, (item) => {
        return `${getMonthFromUnix(item.createdAt) + 1}-${getYearFromUnix(item.createdAt)}`
      })
      const transactionList: {
        month: string
        year: string
        data: Transaction[]
      }[] = Object.keys(transactionGroupedByAllMonth).map((transactionKey) => {
        return {
          month: monthList[Number(transactionKey.split("-")[0]) - 1],
          year: transactionKey.split("-")[1],
          data: transactionGroupedByAllMonth[transactionKey],
        }
      })
      return transactionList
    },
  }))
  .actions((self) => ({
    saveTransactions: (transactionSnapshots: TransactionSnapshot[]) => {
      self.transactions.replace(transactionSnapshots)
    },
  }))
  .actions((self) => ({
    fetchTransactions: flow(function* () {
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
