import React from 'react'
import { Text, View, ImageBackground, Image, Pressable } from 'react-native'
import { Link } from 'expo-router'
import styles from './styles'
import { useFonts } from 'expo-font'

export default function Page () {
  const [fontsLoaded] = useFonts({
    Tinos: require('../../assets/fonts/Tinos-Regular.ttf')
  })
  if (!fontsLoaded) {
    return <Text>...</Text>
  }

  return (
    <View style={styles.imageContainer}>
      <ImageBackground source={{uri: 'https://www.gsu.edu/wp-content/uploads/2021/09/StateWayDowntown-1000.jpg'}} style={styles.imageBackground}>
        <View style={styles.container}>
          <Text style={styles.title}>ATTEND-IN</Text>
          <Image source={require('../../assets/Panther Head Logo.png')} style={styles.logo}/>
          <View style={[styles.verticallySpaced, { marginTop: 60 }]}>
            <Link href="/login" asChild>
            <Pressable style={styles.landingButton}>
                <Text style={styles.buttonText}>Sign in</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}
