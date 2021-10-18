import { flow, Instance, isAlive, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import _ from "underscore"
import {
  GetMeWallet,
  GetMyPaymentRequests,
  GetMyWalletTransactions,
  SendPaymentRequest,
  SendRequestPaymentDto,
} from "../../generated/graphql"
import { WalletModel, WalletSnapshot } from "../wallet/wallet"
import { UserResolverAPI, WalletResolverApi } from "../../services/resolvers"
import { Transaction, TransactionModel, TransactionSnapshot } from "../transaction/transaction"
import {
  getMonthFromUnix,
  getYearFromUnix,
  isToday,
  isYesterday,
  monthList,
} from "../../utils/date"
import { User } from "../user/user"

export const WalletStoreModel = types
  .model("WalletStore")
  .props({
    wallet: types.optional(WalletModel, {}),
    transactions: types.optional(types.array(TransactionModel), []),
    requestedTransactions: types.optional(types.array(TransactionModel), []),
    syncedTransactions: types.optional(types.array(TransactionModel), []),
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
    saveRequestedTransactions: (transactionSnapshots: TransactionSnapshot[]) => {
      self.requestedTransactions.replace(transactionSnapshots)
    },
    saveSyncedTransactions: (transactionSnapshots: TransactionSnapshot[]) => {
      self.syncedTransactions.replace(transactionSnapshots)
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
    syncTransactions: async function () {
      const result = await Promise.all([
        this.fetchTransactions(),
        this.fetchRequestedTransactions(),
      ])

      const syncedTransactions = self.transactions.concat(self.syncedTransactions)

      self.saveSyncedTransactions(syncedTransactions as TransactionSnapshot[])

      return result[0].success && result[1].success
    },
    fetchTransactions: async function () {
      console.log("WalletStore - FetchTransactions")
      const transactionApi = new WalletResolverApi()
      const result = await transactionApi.getMyWalletTransactions({
        limit: 10,
        skip: 0,
      })

      if (result.success) {
        self.saveTransactions(result.data as TransactionSnapshot[])
      } else {
        __DEV__ && console.tron.log(result.errors)
      }

      return result as GetMyWalletTransactions
    },
    fetchRequestedTransactions: async function () {
      console.log("WalletStore - FetchRequestedTransactions")
      const transactionApi = new WalletResolverApi()
      const result = await transactionApi.getMyPaymentRequests({
        limit: 1,
      })
      if (result.success) {
        const payReqData = result.data
        if (payReqData && payReqData.length > 0) {
          self.saveRequestedTransactions(
            payReqData.map((request) => request.transaction) as TransactionSnapshot[],
          )
        }
      } else {
        __DEV__ && console.tron.log(result.errors)
      }
      return result as GetMyPaymentRequests
    },
    fetchWalletOwner: async function (walletId: string): Promise<User> {
      console.log("WalletStore - FetchWalletOwner")
      const wallet = await new WalletResolverApi().getWallet(walletId)
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
    // sendInAppPayment: async function ({
    //   amount,
    //   currency,
    //   description,
    //   method,
    //   walletId,
    // }: SendInAppPaymentDto) {},
    sendPaymentRequest: async function ({
      amount,
      method,
      description,
      currency,
      userId,
    }: Partial<SendRequestPaymentDto> & {
      userId: string
    }) {
      const walletResolverApi = new WalletResolverApi()
      const toWallet = await walletResolverApi.getWallet(userId)
      if (toWallet.success && toWallet.data) {
        const response = await walletResolverApi.sendPaymentRequest({
          amount,
          method,
          currency,
          description,
          walletId: toWallet.data.id,
        })
        if (response.success) {
          return response as SendPaymentRequest
        } else {
          __DEV__ && console.tron.log(response.errors)
          return null
        }
      }
      __DEV__ && console.tron.log(toWallet.errors)
      return null
    },
  }))

type WalletStoreType = Instance<typeof WalletStoreModel>
export interface WalletStore extends WalletStoreType {}
type WalletStoreSnapshotType = SnapshotOut<typeof WalletStoreModel>
export interface WalletStoreSnapshot extends WalletStoreSnapshotType {}
export const createWalletStoreDefaultModel = () => types.optional(WalletStoreModel, {})
