import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { TransactionStoreModel } from "../transaction-store/transaction-store"
import { UserStoreModel } from "../user-store/user-store"
import { WalletStoreModel } from "../wallet-store/wallet-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  transactionStore: types.optional(TransactionStoreModel, {} as any),
		userStore: types.optional(UserStoreModel, {} as any),
		walletStore: types.optional(WalletStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
