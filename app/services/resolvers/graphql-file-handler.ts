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
    addNewContact: loader("./user/mutations/addNewContact.gql"),
    /** Bank */
    createLinkToken: loader("./bank/mutations/createLinkToken.gql"),
    connectBankAccount: loader("./bank/mutations/connectBankAccount.gql"),
    /** Btc */
    generateOnChainInvoice: loader("./btc/mutations/generateOnChainInvoice.gql"),
    generateLightningInvoice: loader("./btc/mutations/generateLightningInvoice.gql"),
    /** Wallet */
    cancelPaymentRequest: loader("./wallet/mutations/cancelPaymentRequest.gql"),
    sendInAppPayment: loader("./wallet/mutations/sendInAppPayment.gql"),
    sendPaymentRequest: loader("./wallet/mutations/sendPaymentRequest.gql"),
    sendLightningPayment: loader("./wallet/mutations/sendLightningPayment.gql"),
    respondPaymentRequest: loader("./wallet/mutations/respondPaymentRequest.gql"),
  },
  queries: {
    /** User */
    getCurrentUser: loader("./user/queries/getCurrentUser.gql"),
    getMyContacts: loader("./user/queries/getMyContacts.gql"),
    getUser: loader("./user/queries/getUser.gql"),
    searchUser: loader("./user/queries/searchUser.gql"),
    /** Wallet */
    getWallet: loader("./wallet/queries/getWallet.gql"),
    getMyWallet: loader("./wallet/queries/getMyWallet.gql"),
    getMyWalletTransactions: loader("./wallet/queries/getMyWalletTransactions.gql"),
    getMyPaymentRequests: loader("./wallet/queries/getMyPaymentRequests.gql"),
    getPaymentRequest: loader("./wallet/queries/getPaymentRequest.gql"),
    getTransaction: loader("./wallet/queries/getTransaction.gql"),
    /** Bank */
    getMyBankAccounts: loader("./bank/queries/getMyBankAccounts.gql"),
  },
}

export default gqlModules
