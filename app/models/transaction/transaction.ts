import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const TransactionModel = types.model("Transaction").props({
  id: types.maybe(types.string),
  description: types.maybe(types.string),
  status: types.maybe(types.enumeration(["PENDING", "DONE", "EXPIRED", "UNKNOWN"])),
  currency: types.maybe(types.enumeration(["USD", "VND", "CAD"])),
  method: types.maybe(types.enumeration(["LIGHTNING", "ON_CHAIN"])),
  networkFee: types.maybe(types.number),
  transactionFee: types.maybe(types.number),
  createdAt: types.maybe(types.string),
  amount: types.maybe(types.number),
  fromWalletId: types.maybe(types.string),
  toWalletId: types.maybe(types.string),
  btcAmount: types.maybe(types.number),
  btcExchangeRate: types.maybe(types.number),
})

type TransactionType = Instance<typeof TransactionModel>
export interface Transaction extends TransactionType {}
type TransactionSnapshotType = SnapshotOut<typeof TransactionModel>
export interface TransactionSnapshot extends TransactionSnapshotType {}
export const createTransactionDefaultModel = () => types.optional(TransactionModel, {})
