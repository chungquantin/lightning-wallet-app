import React from "react"

export const SnackBarContext = React.createContext<
  Partial<{
    text: string
    actionLabel: string
    actionOnPress: () => void
    duration: number
    setSnackBar: React.Dispatch<
      React.SetStateAction<{
        text: string
        actionLabel: string
        actionOnPress: () => void
        duration: number
      }>
    >
    onToggleSnackBar: () => void
    onDismissSnackBar: () => void
  }>
>({})
