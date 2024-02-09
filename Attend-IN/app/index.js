// IndexPage.js

import { router } from 'expo-router'
import { useEffect } from 'react'
import { supabase } from './lib/supabase'

export default function IndexPage () {
  useEffect(() => {
    // Ensure navigation tree is ready

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/(tabs)/home/')
      } else {
        console.log('no user')
        router.replace('/(auth)/login')
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace('/(tabs)/home/')
      } else {
        console.log('no user')
        router.replace('/(auth)/login')
      }
    })
  }, [])
}