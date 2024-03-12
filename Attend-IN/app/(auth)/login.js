/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { Alert, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { Stack } from 'expo-router'
import { supabase } from '../lib/supabase'
import styles from './styles'

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
    <View style={[styles.container, styles.verticallySpaced, styles.mt20]}>
      <Stack.Screen options={{ headerShown: true, title: 'Supabase Expo Router App' }} />
      <View>
        <Text style={[styles.text, styles.topText, { fontSize: 40 }, { color: '#1044A9' }]}>Sign In</Text>
        <Text style={styles.text}>Already registered? Log in here.</Text>
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={styles.text}>U S E R N A M E</Text>
        <TextInput
          style={styles.textInput}
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="pantherid@student.gsu.edu"
          autoCapitalize={'none'}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Text style={styles.text}>P A S S W O R D</Text>
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
        {<TouchableOpacity
            style={[styles.buttonContainer, styles.buttonText, { width: 200 }]}
            disabled={loading}
            onPress={signInWithEmail}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

        /* <Button
          disabled={loading}
          title='Sign In'
          onPress={() => signInWithEmail()}
          buttonStyle={styles.buttonContainer}
        /> */
        }

      </View>
    </View>
  )
}
