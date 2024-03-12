// IndexPage.js

import { router } from 'expo-router'
import { useEffect } from 'react'
import { supabase } from './lib/supabase'
import './global'

export default function IndexPage () {
  useEffect(() => {
    // Ensure navigation tree is ready

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/(tabs)/home/')
        // console.log(global.isTeacher)
        // if (global.isTeacher) {
        //   console.log('put additional logic here')
        // }
      } else {
        console.log('no user')
        router.replace('/(auth)/home')
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace('/(tabs)/home/')
        // console.log(global.isTeacher)
        // if (global.isTeacher) {
        //   console.log('put additional logic here')
        // }
      } else {
        console.log('no user')
        router.replace('/(auth)/home')
      }
    })
  }, [])
}
