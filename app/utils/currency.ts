import getSymbolFromCurrency from "currency-symbol-map"
import currency from "currency.js"

const getListCurrency = ["USD", "VND", "CAD"]

const abbreviator = (num, dec) => {
  // 2 decimal places => 100, 3 => 1000, etc
  const decPlaces = 10 ** dec
  let number = num
  // Enumerate number abbreviations
  const abbrev = ["K", "M", "B", "T"]

  let i = abbrev.length - 1
  while (i >= 0) {
    const size = 10 ** ((i + 1) * 3)

    if (size <= number) {
      number = Math.round(number * (decPlaces / size)) / decPlaces
      if (number === 1000 && i < abbrev.length - 1) {
        number = 1
        i += 1
      }
      number += abbrev[i]
      break
    }
    i -= 1
  }
  return number
}

const formatByUnit = (value, unit = null, isCompacted = false) => {
  const showSign = unit !== "BTC" && unit !== "USDt" && unit !== "BUSD"
  const symbol = unit ? `${unit} ` : ""
  if (value >= 1000000 && isCompacted) {
    // eslint-disable-next-line max-len
    return `${showSign && unit ? getSymbolFromCurrency(unit) : symbol} ${abbreviator(value, 2)}`
  }
  switch (unit) {
    case "VND":
      return currency(Math.round(value), {
        symbol: showSign && unit ? getSymbolFromCurrency(unit) : symbol,
        separator: ",",
        decimal: ".",
        precision: 0,
      }).format()

    default:
      return currency(value, {
        symbol: showSign && unit ? getSymbolFromCurrency(unit) : symbol,
        separator: ",",
        decimal: ".",
        precision: 2,
      }).format()
  }
}

export { formatByUnit, abbreviator, getListCurrency }
