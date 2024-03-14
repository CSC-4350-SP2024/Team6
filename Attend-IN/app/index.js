// IndexPage.js

import { router } from 'expo-router'
import { useEffect } from 'react'
import { supabase } from './lib/supabase'
import { isUserATeacher } from './service/userService'

export default function IndexPage () {
  useEffect(() => {
    // Ensure navigation tree is ready

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        if (await isUserATeacher(session?.user?.id)) {
          router.replace('/(tabs)/home/') // user is a teacher
        } else {
          router.replace('/(tabs)/home/') // user is not a teacher
        }
      } else {
        console.log('no user')
        router.replace('/(auth)/home')
      }
    })

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        router.replace('/(tabs)/home/')
      } else {
        console.log('no user')
        router.replace('/(auth)/home')
      }
    })
  }, [])
}
