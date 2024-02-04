import React from 'react'
import { GluestackUIProvider, Text, Box } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config' // Optional if you want to use default theme
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

export default function App () {
  return (
    <GluestackUIProvider config={config}>
      <Box style={styles.container}>
      <Text>Jesse, Tiffany, Bright, Karlissa, Tai!</Text>
      <StatusBar style="auto" />
    </Box>
    </GluestackUIProvider>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
