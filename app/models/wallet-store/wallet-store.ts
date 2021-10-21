import { flow, Instance, isAlive, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import _ from "underscore"
import {
  GetMeWallet,
  GetMyPaymentRequests,
  GetMyWalletTransactions,
  SendInAppPayment,
  SendPaymentRequest,
  SendRequestPaymentDto,
  TransactionRequestStatus,
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
import {
  RequestedTransaction,
  RequestedTransactionModel,
  RequestedTransactionSnapshot,
} from "../requested-transaction/requested-transaction"
import { setUndefinedAl } from "../../utils/misc"
import { clear, remove } from "../../utils/storage"
import { STORAGE_KEY } from "../../constants/AsyncStorageKey"

export const WalletStoreModel = types
  .model("WalletStore")
  .props({
    wallet: types.optional(WalletModel, {}),
    transactions: types.optional(types.array(TransactionModel), []),
    requestedTransactions: types.optional(types.array(RequestedTransactionModel), []),
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
    saveRequestedTransactions: (transactionSnapshots: RequestedTransactionSnapshot[]) => {
      self.requestedTransactions.replace(transactionSnapshots)
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
      data: RequestedTransaction[]
    }[] {
      const transactionGroupedByAllMonth = _.groupBy(transactions || self.transactions, (item) => {
        return `${getMonthFromUnix(item.createdAt) + 1}-${getYearFromUnix(item.createdAt)}`
      })
      const transactionList: {
        month: string
        year: string
        data: RequestedTransaction[]
      }[] = Object.keys(transactionGroupedByAllMonth).map((transactionKey) => {
        return {
          month: monthList[Number(transactionKey.split("-")[0]) - 1],
          year: transactionKey.split("-")[1],
          data: transactionGroupedByAllMonth[transactionKey],
        }
      })
      return transactionList
    },
    filterGroupedTransactionByStatus(status: TransactionRequestStatus) {
      return this.groupTransactionByMonthAndYear(
        self.requestedTransactions.filter((transaction) => transaction.status === status),
      )
    },
  }))
  .actions((self) => ({
    logout: flow(function* () {
      try {
        console.log("WalletStore - Logout")
        setUndefinedAl(self.transactions)
        setUndefinedAl(self.requestedTransactions)
        setUndefinedAl(self.wallet)
        remove(STORAGE_KEY.REQUESTED_TRANSACTIONS)
        remove(STORAGE_KEY.TRANSACTIONS)
        remove(STORAGE_KEY.MY_WALLET)
        clear()
      } catch (error) {
        console.tron.log(error.message)
      }
    }),
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
    fetchTransactions: async function () {
      console.log("WalletStore - FetchTransactions")
      const transactionApi = new WalletResolverApi()
      const result = await transactionApi.getMyWalletTransactions({})

      if (result.success) {
        self.saveTransactions(result.data as TransactionSnapshot[])
      } else {
        __DEV__ && console.tron.log(result.errors)
      }

      return result as GetMyWalletTransactions
    },
    fetchRequestedTransactions: async function (limit?: number) {
      console.log("WalletStore - FetchRequestedTransactions")
      const transactionApi = new WalletResolverApi()
      const result = await transactionApi.getMyPaymentRequests(
        limit
          ? {
              limit: limit,
            }
          : {},
      )
      if (result.success) {
        const payReqData = result.data
        if (result.data.length === 0) {
          self.saveRequestedTransactions([])
        }
        if (payReqData && payReqData.length > 0) {
          const transactions = (await Promise.all(
            payReqData.map(async (request) => {
              let destination: User
              if (self.wallet.id === request.requestFrom) {
                destination = await this.fetchWalletOwner(request.requestTo)
              } else {
                destination = await this.fetchWalletOwner(request.requestFrom)
              }
              return {
                ...request.transaction,
                status: request.status,
                description:
                  self.wallet.id === request.requestFrom
                    ? `Request to ${destination.email}`
                    : `Request from ${destination.email}`,
                type: self.wallet.id === request.requestFrom ? "RECEIVE" : "SEND",
                requestId: request.id,
                expiredAt: request.expiredAt,
                createdAt: request.createdAt,
                settledAt: request.settledAt,
                from: request.requestFrom,
                to: request.requestTo,
              }
            }),
          )) as RequestedTransactionSnapshot[]
          const sortedTransactions = _.sortBy(transactions, (transaction) => -transaction.createdAt)
          self.saveRequestedTransactions(sortedTransactions)
        }
        return result as GetMyPaymentRequests
      } else {
        __DEV__ && console.tron.log(result.errors)
        return null
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
    sendInAppPayment: async function ({ amount, currency, description, method, userId }) {
      const walletResolverApi = new WalletResolverApi()
      const toWalletResponse = await walletResolverApi.getWallet({
        userId,
      })
      if (toWalletResponse.success) {
        const response = await walletResolverApi.sendInAppPayment({
          amount,
          currency,
          description,
          method: method,
          walletId: toWalletResponse.data.id,
        })
        if (response.success) {
          return response as SendInAppPayment
        } else {
          __DEV__ && console.tron.log(response.errors)
          return null
        }
      } else {
        __DEV__ && console.tron.log(toWalletResponse.errors)
        return null
      }
    },
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
      const toWallet = await walletResolverApi.getWallet({ userId })
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
