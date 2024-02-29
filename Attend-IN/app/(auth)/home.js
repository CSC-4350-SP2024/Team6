import React from 'react'
import { Pressable, Text } from 'react-native'
import { Link } from 'expo-router'

export default function Page () {
  return (
    <Link href="/login" asChild>
      <Pressable>
        <Text>Log IN</Text>
      </Pressable>
    </Link>
  )
}
