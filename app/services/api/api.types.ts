import { GeneralApiProblem } from "./api-problem"
import { Transaction } from "../../models/transaction/transaction"
import { User } from "../../models/user/user"

export type GetUserContactsResult = { kind: "ok"; userContacts: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetTransactionsResult = { kind: "ok"; transactions: Transaction[] } | GeneralApiProblem
export type GetTransactionResult = { kind: "ok"; transaction: Transaction } | GeneralApiProblem
