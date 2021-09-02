import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const TransactionModel = types.model("Transaction").props({
  id: types.maybe(types.string),
  description: types.maybe(types.string),
  status: types.maybe(types.enumeration(["PENDING", "COMPLETED", "EXPIRED"])),
  type: types.maybe(types.enumeration(["IN", "OUT"])),
  currency: types.maybe(types.enumeration(["USD", "VND", "CAD"])),
  createdAt: types.maybe(types.number),
  expiredAt: types.maybe(types.number),
  amount: types.maybe(types.number),
  from: types.maybe(types.string),
  to: types.maybe(types.string),
})

type TransactionType = Instance<typeof TransactionModel>
export interface Transaction extends TransactionType {}
type TransactionSnapshotType = SnapshotOut<typeof TransactionModel>
export interface TransactionSnapshot extends TransactionSnapshotType {}
export const createTransactionDefaultModel = () => types.optional(TransactionModel, {})
