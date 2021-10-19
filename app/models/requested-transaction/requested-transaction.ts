import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { TransactionModel } from "../transaction/transaction"

export const RequestedTransactionModel = TransactionModel.named("RequestedTRansaction").props({
  type: types.maybe(types.enumeration(["RECEIVE", "SEND"])),
  requestId: types.maybe(types.string),
  expiredAt: types.maybe(types.string),
  createdAt: types.maybe(types.string),
  settledAt: types.maybeNull(types.string),
  from: types.maybe(types.string),
  to: types.maybe(types.string),
})

type RequestedTransactionType = Instance<typeof RequestedTransactionModel>
export interface RequestedTransaction extends RequestedTransactionType {}
type RequestedTransactionSnapshotType = SnapshotOut<typeof RequestedTransactionModel>
export interface RequestedTransactionSnapshot extends RequestedTransactionSnapshotType {}
export const createRequestedTransactionDefaultModel = () =>
  types.optional(RequestedTransactionModel, {})
