import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Rick and Morty character model.
 */
export const TransactionModel = types.model("Transaction").props({
  id: types.maybe(types.string),
  description: types.maybe(types.string),
  status: types.maybe(types.string),
  type: types.maybe(types.string),
  currency: types.maybe(types.string),
  amount: types.maybe(types.number),
  from: types.maybe(types.string),
  to: types.maybe(types.string),
})

type TransactionType = Instance<typeof TransactionModel>
export interface Transaction extends TransactionType {}
type TransactionSnapshotType = SnapshotOut<typeof TransactionModel>
export interface TransactionSnapshot extends TransactionSnapshotType {}
export const createTransactionDefaultModel = () => types.optional(TransactionModel, {})
