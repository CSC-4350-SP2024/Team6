/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native'
import { getUserData, getUserClasses } from '../../service/classService.js'
import styles from './classes_styling.js'
import { useFonts } from 'expo-font';
import * as Location from 'expo-location'
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
// import { Agenda } from 'react-native-calendars';
// import { Card } from 'react-native-paper';

function UserClasses () {
  const [classes, setClasses] = useState([])
  const [userId, setUserId] = useState(null)
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  //For Custom Fonts
  // const [fontsLoaded] = useFonts({
  //   Tinos: require('../assets/fonts/Tinos-Regular.ttf')
  // })
  // if (!fontsLoaded) {
  //   return <Text>...</Text>
  // }

  //For Calendar
  const currentDate = new Date();
  const lastYear = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate()); //Retrieves the date 1 year behind from currnt time
  const nextYear = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate()); //Retrieves the date 1 year ahead from current time
  const startDate = moment().startOf('week').toDate(); // Start date of the current week
  const endDate = moment().endOf('week').toDate(); // End date of the current week
  const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const formattedEndDate = endDate.toLocaleDateString('en-US', { day: 'numeric' });
  const customHeader = 'Week of ' + formattedStartDate + ' - ' + formattedEndDate;

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

      <View style={{backgroundColor: '#1044a9'}}>
        <Text style={[{color: 'white'}, {paddingTop: 20}, {fontFamily: 'serif'}, {fontSize: 20}, {backgroundColor: '#1044a9'}]}>   Welcome, [Full Name] </Text>
      </View>
      <CalendarStrip
        scrollable
        scrollerPaging
        minDate={lastYear}
        maxDate={nextYear}
        style={{height:100, paddingTop: 10, paddingBottom: 10}}
        calendarColor={'#1044a9'} //Background color for calendar
        calendarHeaderStyle={{color: 'white', fontFamily: 'serif', fontSize: 15}}
        dateNumberStyle={{color: 'white', fontFamily: 'serif'}}
        dateNameStyle={{color: 'white', fontFamily: 'serif'}}
        highlightDateNameStyle={{color:'white'}}
        highlightDateNumberStyle={{color:'white'}}
        selectedDateStyle={{color: 'white', backgroundColor: 'F4A543'}}
        daySelectionAnimation={{type: 'background',
                                duration: '30', 
                                borderWidth: 1, 
                                highlightColor: 'transparent', 
                                borderHighlightColor: 'white'}}
        highlightDateContainerStyle={{ backgroundColor: '#77A1F2' }} //Background color for selected date
        iconContainer={{flex: 0.1}}
        calendarAnimation={{type: 'paralell', duration: 500}} //Need to fix but is supposed to add fade in animation when going to next page
        //headerText={customHeader}
      />

      <View style={{backgroundColor: '#1044a9'}}>
        <Text style={[{color: '#1044a9'}, {padding: 10}, {fontFamily: 'serif'}, {fontSize: 15}, {backgroundColor: '#D1DFFB'}, {textAlign: 'center'}]}>[Upcoming Class]</Text>
      </View>

    <View style={styles.outerClassContainer}>
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
  </View>
  )
}

export default UserClasses
