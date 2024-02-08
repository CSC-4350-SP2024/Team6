// RootLayout.js

import { React, useEffect } from 'react'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'

export {
  ErrorBoundary
} from 'expo-router'

// eslint-disable-next-line camelcase
export const unstable_settings = {
  initialRouteName: '(tabs)'
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout () {
  const [loaded, error] = useFonts({})

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    // Ensure navigation tree is ready
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav () {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)/modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  )
}
