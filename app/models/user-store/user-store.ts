import { flow, Instance, isAlive, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { User, UserModel, UserSnapshot } from "../user/user"
import _ from "underscore"
import { UserResolverAPI } from "../../services/resolvers"
import {
  GetMyContacts,
  GetUser,
  Login,
  LoginDto,
  Me,
  Register,
  RegisterDto,
} from "../../generated/graphql"
import { clear, saveString } from "../../utils/storage"
import { STORAGE_KEY } from "../../constants/AsyncStorageKey"
import { setUndefinedAl } from "../../utils/misc"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    currentUser: types.optional(UserModel, {}),
    contacts: types.optional(types.array(UserModel), []),
    contact: types.optional(UserModel, {}),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveUserContacts: (userContactsSnapshot: UserSnapshot[]) => {
      if (isAlive(self.contacts)) {
        self.contacts.replace(userContactsSnapshot)
      }
    },
    saveCurrentUser: (userSnapshot: UserSnapshot) => {
      if (isAlive(self.currentUser)) {
        self.currentUser = userSnapshot
      }
    },
    saveContact: (userSnapshot: UserSnapshot) => {
      if (isAlive(self.contact)) {
        self.contact = userSnapshot
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
      logout: flow(function* () {
        try {
          console.log("UserStore - Logout")
          setUndefinedAl(self.currentUser)
          setUndefinedAl(self.contacts)
          clear()
        } catch (error) {
          console.tron.log(error.message)
        }
      }),
      login: flow(function* (dto: LoginDto) {
        try {
          console.log("UserStore - Login")
          const userApi = new UserResolverAPI()
          const result = yield userApi.login(dto)
          if (result.success) {
            // store token
            self.saveTokens(result.data)
          } else {
            __DEV__ && console.tron.log(result.errors)
          }
          return result as Login
        } catch (error) {
          console.tron.error(error.message, "login")
          throw error
        }
      }),
      register: flow(function* (dto: RegisterDto) {
        try {
          console.log("UserStore - Register")
          const userApi = new UserResolverAPI()
          const result = yield userApi.register(dto)
          if (result.success) {
            // handle successful creation
          } else {
            __DEV__ && console.tron.log(result.errors)
          }
          return result as Register
        } catch (error) {
          console.tron.error(error.message, "register")
          throw error
        }
      }),
      fetchUserContacts: flow(function* () {
        try {
          console.log("UserStore - FetchUserContacts")
          const userApi = new UserResolverAPI()
          const result = yield userApi.getMyContacts()
          if (result.success) {
            self.saveUserContacts(result.data)
          } else {
            __DEV__ && console.tron.log(result.errors)
          }
          return result as GetMyContacts
        } catch (error) {
          console.tron.error(error.message, "FetchUserContacts")
          throw error
        }
      }),
      fetchCurrentUser: flow(function* () {
        console.log("UserStore - FetchCurrentUser")
        try {
          const userApi = new UserResolverAPI()
          const result = yield userApi.getCurrentUser()

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
      }),
      fetchContact: flow(function* (id: string) {
        console.log("UserStore - FetchContact")
        try {
          const userApi = new UserResolverAPI()
          const result = yield userApi.getUser(id)

          if (result.success) {
            self.saveContact(result.data)
          } else {
            __DEV__ && console.tron.log(result.errors)
          }
          return result as GetUser
        } catch (error) {
          console.tron.error(error.message, "fetchContact")
          throw error
        }
      }),
    }
  })

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
