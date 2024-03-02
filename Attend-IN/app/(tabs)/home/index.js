/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native'
import { getUserData, getUserClasses } from '../../service/classService.js'
import styles from './classes_styling.js'
import * as Location from 'expo-location'

function UserClasses () {
  const [classes, setClasses] = useState([])
  const [userId, setUserId] = useState(null)
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    getUserData(setUserId) // Call fetchUserData and pass setUserId to set the user ID
  }, [])

  useEffect(() => {
    if (userId) {
      async function fetchUserClasses () { // Call fetchUserClasses and pass id to retrieve user classes
        try {
          const userClasses = await getUserClasses(userId)
          setClasses(userClasses)
        } catch (error) {
          console.error('Error fetching classes', error)
        }
      }
      fetchUserClasses()
    }
  }, [userId])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        Alert.alert(
          { errorMsg },
          'This app requires location access. Please enable location services in your device settings.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        )
        return
      }

      const locationSubscription = Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 30000, distanceInterval: 1 },
        (newLocation) => {
          setLocation(newLocation)
        }
      )
      console.log(location.coords) // display user coordinates in termnial
      return () => {
        // Clean up the subscription when the component unmounts
        locationSubscription.remove()
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
    <Text>User Classes</Text>
    {/* <Text>{location?.coords.latitude}</Text>
    <Text>{location?.coords.longitude}</Text> */}
    <View style={styles.classesContainer}>
      {classes.map((classItem, index) => (
        <View key={classItem.crn} style={styles.classItem}>
          <Text>{classItem.classname}</Text>
          {/* <Text>{classItem.sectionid}</Text> */}
          <Text>{classItem.crn}</Text>
          {/* <Text>{classItem.isteacher ? 'Is Teacher' : 'Not a Teacher'}</Text> */}
        </View>
      ))}
    </View>
  </View>
  )
}

export default UserClasses
