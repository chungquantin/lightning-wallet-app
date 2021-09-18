import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserStoreModel } from "../user-store/user-store"
import { WalletStoreModel } from "../wallet-store/wallet-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
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
