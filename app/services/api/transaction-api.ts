//import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetTransactionsResult } from "./api.types"
//import { getGeneralApiProblem } from "./api-problem"
import { Transaction } from "../../models/character/Transaction"

//const API_PAGE_SIZE = 50

export class TransactionApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getTransactions(): Promise<GetTransactionsResult> {
    try {
      // make the api call
      //const response: ApiResponse<any> = await this.api.apisauce.get(
      //  "https://raw.githubusercontent.com/infinitered/ignite/master/data/rick-and-morty.json",
      //  { amount: API_PAGE_SIZE },
      //)

      const mockTransaction: Transaction = {
        id: "1",
        amount: 100,
        currency: "USD",
        description: "Hello World",
        type: "IN",
        from: "cqtin0903@gmail.com",
        to: "tin@neutronpay.com",
        status: "pending",
      }

      const response = {
        ok: "ok",
        problem: null,
        data: [mockTransaction],
      }

      // the typical ways to die when calling an api
      //if (!response.ok) {
      //  const problem = getGeneralApiProblem(response)
      //  if (problem) return problem
      //}

      const transactions = response.data

      return { kind: "ok", transactions }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
