import { DocumentNode } from "graphql"
import request from "graphql-request"
import { Mutation, PaginationInputType, Query } from "../../generated/graphql"
import gqlModules from "./graphql-file-handler"

interface GQL {
  mutations: {
    [Property in keyof Mutation]: DocumentNode
  }
  queries: {
    [Property in keyof Query]: DocumentNode
  }
}

const GQL = gqlModules
const Mutations = GQL.mutations
const Queries = GQL.queries

export abstract class ResolverApi {
  public url

  public async mutation<T, A>(
    resolver: keyof typeof Mutations,
    args?: {
      data?: A
      Pagination?: PaginationInputType
    },
    headers?: {
      accessToken: string
      refreshToken: string
    },
  ): Promise<{ [key in typeof resolver]: T }> {
    console.log(Mutations[resolver.toString()], resolver.toString())
    try {
      const res = await request<{
        [Property in typeof resolver]: T
      }>(this.url, Mutations[resolver.toString()], args, {
        "x-access-token": headers?.accessToken || "",
        "x-refresh-token": headers?.refreshToken || "",
      })
      return res
    } catch (error) {
      throw error
    }
  }

  public async query<T, A>(
    resolver: keyof typeof Queries,
    args?: {
      data?: A
      Pagination?: PaginationInputType
    },
    headers?: {
      accessToken: string
      refreshToken: string
    },
  ): Promise<{ [key in typeof resolver]: T }> {
    try {
      const res = await request<{
        [Property in typeof resolver]: T
      }>(this.url, Queries[resolver.toString()], args, {
        "x-access-token": headers?.accessToken || "",
        "x-refresh-token": headers?.refreshToken || "",
      })
      return res
    } catch (error) {
      throw error
    }
  }
}
