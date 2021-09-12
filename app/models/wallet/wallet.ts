import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { getListCurrency } from "../../utils/currency"

export const WalletModel = types.model("Wallet").props({
  id: types.maybe(types.string),
  balance: types.maybe(types.number),
  defaultCurrency: types.maybe(types.enumeration(getListCurrency)),
  createdAt: types.maybe(types.string),
  userId: types.maybe(types.string),
})

type WalletType = Instance<typeof WalletModel>
export interface Wallet extends WalletType {}
type WalletSnapshotType = SnapshotOut<typeof WalletModel>
export interface WalletSnapshot extends WalletSnapshotType {}
export const createTransactionDefaultModel = () => types.optional(WalletModel, {})
