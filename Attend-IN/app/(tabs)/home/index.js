/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { getUserData, getUserClasses, signClassAttendance } from '../../service/classService.js'
import styles from './classes_styling.js'

function UserClasses () {
  const [classes, setClasses] = useState([])
  const [userId, setUserId] = useState(null)

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

  return (
    <View style={styles.container}>
    <Text>User Classes</Text>
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
