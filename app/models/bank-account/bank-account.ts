import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const BankAccountModel = types.model("BankAccount").props({
  id: types.maybe(types.string),
  accountId: types.maybe(types.string),
  userId: types.maybe(types.string),
  name: types.maybe(types.string),
  officialName: types.maybe(types.string),
  availableBalance: types.maybe(types.number),
  currentBalance: types.maybe(types.number),
  limitBalance: types.maybe(types.number),
  currencyCode: types.maybe(types.string),
  institutionName: types.maybe(types.string),
  institutionLogo: types.maybe(types.string),
  institutionPrimaryColor: types.maybe(types.string),
  institutionWebsite: types.maybe(types.string),
  routingNumber: types.maybe(types.string),
  accountNumber: types.maybe(types.string),
  addedAt: types.maybe(types.string),
})

type BankAccountType = Instance<typeof BankAccountModel>
export interface BankAccount extends BankAccountType {}
type BankAccountSnapshotType = SnapshotOut<typeof BankAccountModel>
export interface BankAccountSnapshot extends BankAccountSnapshotType {}
export const createTransactionDefaultModel = () => types.optional(BankAccountModel, {})
