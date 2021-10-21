import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { BankResolverApi } from "../../services/resolvers"
import { GetMyBankAccounts, PlaidCreateLinkToken } from "../../generated/graphql"
import { BankAccount, BankAccountModel, BankAccountSnapshot } from "../bank-account/bank-account"

export const BankStoreModel = types
  .model("BankStore")
  .extend(withEnvironment)
  .props({
    linkToken: types.optional(types.string, ""),
    bankAccounts: types.optional(types.array(BankAccountModel), []),
  })
  .actions((self) => {
    return {
      saveLinkToken: (linkToken: string) => (self.linkToken = linkToken),
      saveBankAccounts: (bankAccountsSnapShot: BankAccountSnapshot[]) => {
        return self.bankAccounts.replace(bankAccountsSnapShot)
      },
    }
  })
  .actions((self) => {
    return {
      connectBankAccount: async function ({ publicToken, metadata }) {
        try {
          console.log(publicToken, metadata)
          const result = await new BankResolverApi().connectBankAccount({
            accountId: metadata.accounts[0]._id,
            institutionId: metadata.institution.id,
            publicToken,
          })
          if (!result.success) {
            __DEV__ && console.tron.log(result.errors)
          }
          return result
        } catch (error) {
          console.tron.error(error.message, "fetchBankAccounts")
          throw error
        }
      },
      fetchMyBankAccounts: flow(function* () {
        console.log("BankStore - FetchBankAccounts")
        try {
          const bankApi = new BankResolverApi()
          const result: GetMyBankAccounts = yield bankApi.getMyBankAccounts()
          if (result.success) {
            const convertedData: BankAccount[] = result.data.map<BankAccount>((bankAccount) => {
              const ach = bankAccount.ach
              const balance = bankAccount.balance
              return {
                id: bankAccount.id,
                userId: bankAccount.userId,
                accountId: bankAccount.accountId,
                addedAt: bankAccount.addedAt,
                name: bankAccount.name,
                officialName: bankAccount.officialName,
                availableBalance: balance.availableBalance,
                currentBalance: balance.currentBalance,
                limitBalance: balance.limitBalance,
                currencyCode: balance.isoCurrencyCode,
                routingNumber: ach.routingNumber,
                accountNumber: ach.account,
                institutionName: bankAccount.institution.institutionName,
                institutionLogo: bankAccount.institution.institutionLogo,
                institutionPrimaryColor: bankAccount.institution.primaryColor,
                institutionWebsite: bankAccount.institution.websiteUrl,
              }
            })
            self.saveBankAccounts(convertedData)
            return result
          } else {
            __DEV__ && console.tron.log(result.errors)
          }

          return result
        } catch (error) {
          console.tron.error(error.message, "fetchBankAccounts")
          throw error
        }
      }),
      fetchLinkToken: flow(function* () {
        console.log("BankStore - FetchLinkToken")
        try {
          const bankApi = new BankResolverApi()
          const result: PlaidCreateLinkToken = yield bankApi.plaidCreateLinkToken()

          if (!result.success) {
            __DEV__ && console.tron.log(result.errors)
          } else {
            self.saveLinkToken(result.data.link_token)
          }

          return result
        } catch (error) {
          console.tron.error(error.message, "fetchLinkToken")
          throw error
        }
      }),
    }
  })

type BankStoreType = Instance<typeof BankStoreModel>
export interface BankStore extends BankStoreType {}
type BankStoreSnapshotType = SnapshotOut<typeof BankStoreModel>
export interface BankStoreSnapshot extends BankStoreSnapshotType {}
export const createBankStoreDefaultModel = () => types.optional(BankStoreModel, {})
