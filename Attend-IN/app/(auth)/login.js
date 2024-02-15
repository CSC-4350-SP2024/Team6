import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { Stack } from 'expo-router'
import { supabase } from '../lib/supabase'
import styles from './styles'; 

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
      <View>
        <Text style={[styles.text, styles.topText, {fontSize: 24}, {color: '#30529c'}]}>Sign In</Text>
        <Text style={styles.text}>Already registered? Log in here.</Text>
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={styles.text}>U S E R N A M E</Text>
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
            style={[styles.buttonContainer, styles.buttonText, {width: 375}]}
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

      <Text style={styles.text}>{'\n'}Don't have an account?</Text>

      <View style={styles.verticallySpaced}>
        { <TouchableOpacity
            style={[styles.buttonContainer, styles.buttonText, {width: 300}]}
            disabled={loading}
            onPress={signUpWithEmail}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

        /* <Button
          disabled={loading}
          title='SignUp'
          onPress={() => signUpWithEmail()}
          buttonStyle={[styles.buttonContainer, styles.buttonText]}
        /> */
        }
      </View>
    </View>
  )
}