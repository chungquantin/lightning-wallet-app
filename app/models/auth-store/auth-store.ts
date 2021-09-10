import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import _ from "underscore"
import { UserResolverAPI } from "../../services/resolvers/user/user-resolver-api"
import { Login, LoginDto, Register, RegisterDto } from "../../generated/graphql"
import { saveString } from "../../utils/storage"

export const AuthStoreModel = types
  .model("AuthStore")
  .props({})
  .extend(withEnvironment)
  .actions((self) => ({
    saveTokens: ({ accessToken, refreshToken }: Record<"accessToken" | "refreshToken", string>) => {
      saveString("accessToken", accessToken)
      saveString("refreshToken", refreshToken)
    },
  }))
  .actions((self) => ({
    login: flow(function* (dto: LoginDto) {
      const userApi = new UserResolverAPI()
      const result = yield userApi.login(dto)

      if (result.success) {
        // store token
        self.saveTokens(result.data)
      } else {
        __DEV__ && console.tron.log(result.errors)
      }
      return result as Login
    }),
    register: flow(function* (dto: RegisterDto) {
      const userApi = new UserResolverAPI()
      const result = yield userApi.register(dto)

      if (result.success) {
        // handle successful creation
      } else {
        __DEV__ && console.tron.log(result.errors)
      }
      return result as Register
    }),
  }))

type AuthStoreType = Instance<typeof AuthStoreModel>
export interface AuthStore extends AuthStoreType {}
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>
export interface AuthStoreSnapshot extends AuthStoreSnapshotType {}
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
