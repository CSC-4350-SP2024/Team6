import React, { useState } from 'react'
import { Alert, StyleSheet, TextInput, View, Button } from 'react-native'
import { Stack } from 'expo-router'
import { supabase } from '../lib/supabase'

export default function AuthPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail () {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) Alert.alert('Sign In Error', error.message)
    setLoading(false)
  }

  async function signUpWithEmail () {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) Alert.alert('Sign Up Error', error.message)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: 'Supabase Expo Router App' }} />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          style={styles.textInput}
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          style={styles.textInput}
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          disabled={loading}
          title='Sign In'
          onPress={() => signInWithEmail()}
          style={styles.buttonContainer}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          disabled={loading}
          title='SignUp'
          onPress={() => signUpWithEmail()}
          style={styles.buttonContainer}
        />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch'
  },
  mt20: {
    marginTop: 20
  },
  buttonContainer: {
    backgroundColor: '#000968',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 8
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase'
  },
  textInput: {
    borderColor: '#000968',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 12,
    margin: 8
  }
})
