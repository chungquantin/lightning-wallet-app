import { DocumentNode } from "graphql"
import { loader } from "graphql.macro"
import { Mutation, Query } from "../../generated/graphql"

export type GQLModules = {
  mutations: {
    [Property in keyof Mutation]: DocumentNode
  }
  queries: {
    [Property in keyof Query]: DocumentNode
  }
}

const gqlModules = {
  mutations: {
    /** User */
    login: loader("./user/mutations/login.gql"),
    register: loader("./user/mutations/register.gql"),
    logout: loader("./user/mutations/logout.gql"),
    /** Bank */
    createLinkToken: loader("./bank/mutations/createLinkToken.gql"),
    connectBankAccount: loader("./bank/mutations/connectBankAccount.gql"),
    /** Btc */
    generateOnChainInvoice: loader("./btc/mutations/generateOnChainInvoice.gql"),
    generateLightningInvoice: loader("./btc/mutations/generateLightningInvoice.gql"),
  },
  queries: {
    /** User */
    getCurrentUser: loader("./user/queries/getCurrentUser.gql"),
    getMyContacts: loader("./user/queries/getMyContacts.gql"),
    getUser: loader("./user/queries/getUser.gql"),
    getWallet: loader("./wallet/queries/getWallet.gql"),
    /** Wallet */
    getMyWallet: loader("./wallet/queries/getMyWallet.gql"),
    getMyWalletTransactions: loader("./wallet/queries/getMyWalletTransactions.gql"),
    /** Bank */
    getMyBankAccounts: loader("./bank/queries/getMyBankAccounts.gql"),
  },
}

export default gqlModules
