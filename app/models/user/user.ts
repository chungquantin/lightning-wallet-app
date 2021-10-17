import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const UserModel = types.model("User").props({
  id: types.maybe(types.string),
  phoneNumber: types.maybe(types.string),
  //defaultCurrency: types.maybe(types.enumeration(getListCurrency)),
  firstName: types.maybe(types.string),
  lastName: types.maybe(types.string),
  avatar: types.maybe(types.string),
  email: types.maybe(types.string),
  twoFactorVerified: types.maybe(types.boolean),
  phoneNumberVerified: types.maybe(types.boolean),
  emailVerified: types.maybe(types.boolean),
  createdAt: types.maybe(types.string),
  forgotPasswordLock: types.maybe(types.boolean),
  name: types.maybe(types.string),
  username: types.maybe(types.string),
})

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createTransactionDefaultModel = () => types.optional(UserModel, {})
