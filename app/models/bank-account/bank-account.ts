import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const BankAccountModel = types.model("BankAccount").props({
  id: types.maybe(types.string),
  accountId: types.maybe(types.string),
  userId: types.maybe(types.string),
  name: types.maybe(types.string),
  officialName: types.maybeNull(types.string),
  availableBalance: types.maybeNull(types.number),
  currentBalance: types.maybeNull(types.number),
  limitBalance: types.maybeNull(types.number),
  currencyCode: types.maybeNull(types.string),
  institutionName: types.maybeNull(types.string),
  institutionLogo: types.maybeNull(types.string),
  institutionPrimaryColor: types.maybeNull(types.string),
  institutionWebsite: types.maybeNull(types.string),
  routingNumber: types.maybeNull(types.string),
  accountNumber: types.maybeNull(types.string),
  addedAt: types.maybe(types.string),
})

type BankAccountType = Instance<typeof BankAccountModel>
export interface BankAccount extends BankAccountType {}
type BankAccountSnapshotType = SnapshotOut<typeof BankAccountModel>
export interface BankAccountSnapshot extends BankAccountSnapshotType {}
export const createTransactionDefaultModel = () => types.optional(BankAccountModel, {})
