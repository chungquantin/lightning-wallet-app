import { Instance, isAlive, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { User, UserModel, UserSnapshot } from "../user/user"
import { UserApi } from "../../services/api/user-api"
import _ from "underscore"
import { UserResolverAPI } from "../../services/resolvers"
import { Login, LoginDto, Me, Register, RegisterDto } from "../../generated/graphql"
import { clear, saveString } from "../../utils/storage"
import { STORAGE_KEY } from "../constants/AsyncStorageKey"
import { setUndefinedAl } from "../../utils/misc"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: types.optional(UserModel, {}),
    currentUser: types.optional(UserModel, {}),
    contacts: types.optional(types.array(UserModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveUser: (userSnapshot: UserSnapshot) => {
      if (isAlive(self.contacts)) {
        self.user = userSnapshot
      }
    },
    saveUserContacts: (userContactsSnapshot: UserSnapshot[]) => {
      if (isAlive(self.contacts)) {
        self.contacts.replace(userContactsSnapshot)
      }
    },
    saveCurrentUser: (userSnapshot: UserSnapshot) => {
      if (isAlive(self.contacts)) {
        self.currentUser = userSnapshot
      }
    },
    saveTokens: ({ accessToken, refreshToken }: Record<"accessToken" | "refreshToken", string>) => {
      saveString(STORAGE_KEY.ACCESS_TOKEN, accessToken)
      saveString(STORAGE_KEY.REFRESH_TOKEN, refreshToken)
    },
  }))
  .views((self) => ({
    getContactsByNameAndEmail: (text: string) =>
      self.contacts.filter((contact) => {
        const fullName = `${contact.firstName} ${contact.lastName}`
        return (
          fullName.toLowerCase().includes(text.toLowerCase()) ||
          contact.email.toLowerCase().includes(text)
        )
      }),
    getGroupedContactListByNameAndEmail: (text: string) => {
      const contactList = self.contacts.filter((contact) => {
        const fullName = `${contact.firstName} ${contact.lastName}`
        return (
          fullName.toLowerCase().includes(text.toLowerCase()) ||
          contact.email.toLowerCase().includes(text)
        )
      })
      const contactsGroupByAlphabet = _.groupBy(contactList, (item: User) => {
        return item.firstName[0].toUpperCase()
      })
      return Object.keys(contactsGroupByAlphabet).map((alphabet) => {
        return {
          letter: alphabet,
          count: contactsGroupByAlphabet[alphabet].length,
          data: contactsGroupByAlphabet[alphabet],
        }
      })
    },
    get groupContactsByAlphabet(): {
      letter: string
      data: User[]
    }[] {
      const contactsGroupByAlphabet = _.groupBy(self.contacts, (item: User) => {
        return item.firstName[0].toUpperCase()
      })
      const contactList: {
        letter: string
        data: User[]
      }[] = Object.keys(contactsGroupByAlphabet).map((alphabet) => {
        return {
          letter: alphabet,
          count: contactsGroupByAlphabet[alphabet].length,
          data: contactsGroupByAlphabet[alphabet],
        }
      })
      return contactList
    },
  }))
  .actions((self) => {
    return {
      reset: async function () {
        setUndefinedAl(self.user)
        setUndefinedAl(self.currentUser)
        setUndefinedAl(self.contacts)
      },
      logout: async function () {
        try {
          console.log("AuthStore - Logout")
          this.reset()
          clear()
        } catch (error) {
          console.tron.log(error.message)
        }
      },
      login: async function (dto: LoginDto) {
        console.log("AuthStore - Login")
        const userApi = new UserResolverAPI()
        const result = await userApi.login(dto)

        if (result.success) {
          // store token
          self.saveTokens(result.data)
        } else {
          __DEV__ && console.tron.log(result.errors)
        }
        return result as Login
      },
      register: async function (dto: RegisterDto) {
        console.log("AuthStore - Register")
        const userApi = new UserResolverAPI()
        const result = await userApi.register(dto)

        if (result.success) {
          // handle successful creation
        } else {
          __DEV__ && console.tron.log(result.errors)
        }
        return result as Register
      },
      fetchUser: async function (id: string) {
        const userApi = new UserApi(self.environment.api)
        const result = await userApi.getUser(id)

        if (result.kind === "ok") {
          self.saveUser(result.user)
        } else {
          __DEV__ && console.tron.log(result.kind)
        }
      },
      fetchUserContacts: async function (id: string) {
        try {
          const userApi = new UserApi(self.environment.api)
          const result = await userApi.getUserContacts(id)

          if (result.kind === "ok") {
            self.saveUserContacts(result.userContacts)
          } else {
            __DEV__ && console.tron.log(result.kind)
          }
        } catch (error) {
          console.tron.error(error.message, "fetchUserContacts")
          throw error
        }
      },
      fetchCurrentUser: async function () {
        console.log("UserStore - FetchCurrentUser")
        try {
          const userApi = new UserResolverAPI()
          const result = await userApi.getCurrentUser()

          if (result.success) {
            self.saveCurrentUser(result.data)
          } else {
            __DEV__ && console.tron.log(result.errors)
          }
          return result as Me
        } catch (error) {
          console.tron.error(error.message, "fetchCurrentUser")
          throw error
        }
      },
    }
  })

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
