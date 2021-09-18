import { flow, Instance, isAlive, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import _ from "underscore"
import { GetMeWallet } from "../../generated/graphql"
import { WalletModel, WalletSnapshot } from "../wallet/wallet"
import { WalletResolverApi } from "../../services/resolvers"
import { Transaction, TransactionModel, TransactionSnapshot } from "../transaction/transaction"
import {
  getMonthFromUnix,
  getYearFromUnix,
  isToday,
  isYesterday,
  monthList,
} from "../../utils/date"

export const WalletStoreModel = types
  .model("WalletStore")
  .props({
    wallet: types.optional(WalletModel, {}),
    transactions: types.optional(types.array(TransactionModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveWallet: (walletSnapshot: WalletSnapshot) => {
      if (isAlive(self.wallet)) {
        self.wallet = walletSnapshot
      }
    },
    saveTransactions: (transactionSnapshots: TransactionSnapshot[]) => {
      self.transactions.replace(transactionSnapshots)
    },
  }))
  .views((self) => ({
    get percentageChange() {
      let rate
      if (self.transactions.length !== 0) {
        let todayIncome = 0
        let yesterdayIncome = 0
        self.transactions.forEach((transaction) => {
          if (isToday(parseInt(transaction.createdAt))) {
            todayIncome += transaction.amount
          } else if (isYesterday(parseInt(transaction.createdAt))) {
            yesterdayIncome += transaction.amount
          }
        })
        if (yesterdayIncome === 0) return 0
        rate = (todayIncome / yesterdayIncome) * 100
      }
      return rate || 0
    },
    get totalWalletBalance() {
      let totalBalance = 0
      self.transactions.filter((transaction) => {
        if (transaction.toWalletId === self.wallet.id) {
          totalBalance += transaction.amount
        } else {
          totalBalance -= transaction.amount
        }
      })
      return totalBalance
    },
    get incomeTransactions() {
      return self.transactions.filter((transaction) => transaction.toWalletId === self.wallet.id)
    },
    get expenseTransactions() {
      return self.transactions.filter((transaction) => transaction.fromWalletId === self.wallet.id)
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
    fetchCurrentUserWallet: flow(function* () {
      console.log("WalletStore - FetchCurrentUserWallet")
      const walletApi = new WalletResolverApi()
      const result = yield walletApi.getCurrentUserWallet()

      if (result.success) {
        // store token
        self.saveWallet(result.data)
      } else {
        __DEV__ && console.tron.log(result.errors)
      }
      return result as GetMeWallet
    }),
    fetchTransactions: flow(function* () {
      console.log("WalletStore - FetchTransactions")
      const transactionApi = new WalletResolverApi()
      const result = yield transactionApi.getMyWalletTransactions()

      if (result.success) {
        self.saveTransactions(result.data)
      } else {
        __DEV__ && console.tron.log(result.errors)
      }
    }),
  }))

type WalletStoreType = Instance<typeof WalletStoreModel>
export interface WalletStore extends WalletStoreType {}
type WalletStoreSnapshotType = SnapshotOut<typeof WalletStoreModel>
export interface WalletStoreSnapshot extends WalletStoreSnapshotType {}
export const createWalletStoreDefaultModel = () => types.optional(WalletStoreModel, {})
