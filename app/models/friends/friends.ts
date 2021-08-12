import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "../user/User"

export const FriendsModel = types.model("Friends").props({
  userId: types.maybe(types.string),
  friends: types.maybe(types.array(UserModel)),
})

type FriendsType = Instance<typeof FriendsModel>
export interface Friends extends FriendsType {}
type FriendsSnapshotType = SnapshotOut<typeof FriendsModel>
export interface FriendsSnapshot extends FriendsSnapshotType {}
export const createFriendsDefaultModel = () => types.optional(FriendsModel, {})
