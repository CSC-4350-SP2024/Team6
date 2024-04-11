import React, { useState, useEffect } from 'react'
import { View, TextInput, Alert, TouchableOpacity, Text, Pressable } from 'react-native'
import { supabase } from '../../lib/supabase' // Import Supabase client instance
import { Link } from 'expo-router'
import * as Linking from 'expo-linking'
import styles from '../../(auth)/styles'

const resetPasswordUrl = Linking.createURL('/settings/updatePassword')

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('')
  console.log(resetPasswordUrl)

  const handleResetPassword = async () => {
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: resetPasswordUrl

      })
      Alert.alert('Password reset email sent!')
      console.log('Password reset email sent!')
    } catch (error) {
      console.error('Error sending password reset email:', error.message)
      Alert.alert('Error', 'Failed to send password reset email. Please try again.')
    }
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        const newPassword = prompt('What would you like your new password to be?')
        const { data, error } = await supabase.auth
          .updateUser({ password: newPassword })

        if (data) alert('Password updated successfully!')
        if (error) alert('There was an error updating your password.')
      }
    })
  }, [])

  return (
    <View style={[styles.container, styles.verticallySpaced, styles.mt20]}>
      <TextInput
       style={styles.textInput}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
            style={[styles.buttonContainer, styles.buttonText, { width: 200 }]}
            onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>

          <View style={[styles.verticallySpaced]}>
            <Link href="/login" asChild>
            <Pressable style={styles.landingButton}>
                <Text style={styles.buttonText}>Home</Text>
              </Pressable>
            </Link>
          </View>
    </View>
  )
}

export default ResetPasswordScreen
