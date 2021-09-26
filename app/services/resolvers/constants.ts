import Constants from "expo-constants"
const { manifest } = Constants

export const useGateway = true
export const API_URL = `http://${manifest.debuggerHost.split(":").shift()}`
export const PRODUCTION_API_URL = null
