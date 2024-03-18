import React, { useState, useEffect } from 'react'
import { Tabs } from 'expo-router'
import { isUserATeacher } from '../service/userService'
import { supabase } from '../lib/supabase'
import { ActivityIndicator } from 'react-native'

export default function TabsLayout () {
  const [user, setUser] = useState(null)
  const [isTeacher, setIsTeacher] = useState(false)
  const [loading, setLoading] = useState(true) // Add loading state

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      setUser(user)
      if (await isUserATeacher(user.id) === true) {
        setIsTeacher(true)
      }
      setLoading(false) // Set loading to false after fetching user data
    })
  }, [])
  console.log(isTeacher)
  console.log(user)

  if (loading) {
    return <ActivityIndicator size="large" />
  }

  return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name='home'
                options={{
                  tabBarLabel: 'Home',
                  title: 'Home',
                  href: isTeacher ? null : '/home'
                }}
            />
             <Tabs.Screen
                name='teacher'
                options={{
                  tabBarLabel: 'Teacher',
                  title: 'Teacher',
                  href: isTeacher ? '/teacher' : null
                }}
            />
            <Tabs.Screen
                name='settings'
                options={{ tabBarLabel: 'Settings', title: 'Settings' }}
            />
        </Tabs>
  )
}
