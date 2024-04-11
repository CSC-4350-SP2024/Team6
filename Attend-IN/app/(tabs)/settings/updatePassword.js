import React, { useState, useEffect } from 'react'
import { View, TextInput, Alert, TouchableOpacity, Text, Pressable } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Link } from 'expo-router'

import styles from '../../(auth)/styles'

const ChangePasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('')
  useEffect(() => {
    // Call refreshSession when the component mounts
    console.log('call refresh session')
    refreshSession()
  }, [])

  const refreshSession = async () => {
    try {
      // Refresh the authentication session
      const { data: sessionData, error: sessionError } = await supabase.auth.refreshSession()
      console.log(sessionData)

      // Check if there's an error refreshing the session
      if (sessionError) {
        throw sessionError
      }
    } catch (error) {
      // Handle any errors that occurred during session refresh
      console.error('Error refreshing session:', error.message)
    }
  }

  const handleChangePassword = async () => {
    try {
      // Update password
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      })

      // Handle updateUser response
      if (data) {
        console.log('Password updated successfully!')
        Alert.alert('Success', 'Password updated successfully!')
      }

      if (error) {
        throw error
      }
    } catch (error) {
      // Handle any errors that occurred during updateUser
      console.error('Error updating password:', error.message)
      Alert.alert('Error', 'Failed to update password. Please try again.')
    }
  }

  return (
    <View style={[styles.container, styles.verticallySpaced, styles.mt20]}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your new password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity
            style={[styles.buttonContainer, styles.buttonText, { width: 200 }]}
            onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>

            <View style={[styles.verticallySpaced]}>
            <Link href="/settings" asChild>
            <Pressable style={styles.landingButton}>
                <Text style={styles.buttonText}>Home</Text>
              </Pressable>
            </Link>
            </View>

    </View>
  )
}

export default ChangePasswordScreen
