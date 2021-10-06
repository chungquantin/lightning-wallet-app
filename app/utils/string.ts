export default {
  capitalize: (str: string) =>
    str.toLowerCase().charAt(0).toUpperCase() + str.slice(1, str.length).toLowerCase(),
}
