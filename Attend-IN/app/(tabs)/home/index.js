/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Alert, Image } from 'react-native';
import { getUserData, getUserClasses } from '../../service/classService.js';
import styles from './classes_styling.js';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { supabase } from '../../lib/supabase.js';


function UserClasses() {
  const [classes, setClasses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [classesForToday, setClassesForToday] = useState([]);
  const [userName, setUserName] = useState(null);

  // For Calendar
  const currentDate = new Date();
  const lastYear = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
  const nextYear = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
  const startDate = moment().startOf('week').toDate();
  const endDate = moment().endOf('week').toDate();
  const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const formattedEndDate = endDate.toLocaleDateString('en-US', { day: 'numeric' });
  const customHeader = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year:'numeric'});

  useEffect(() => {
    getUserData(setUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      async function fetchUserClasses() {
        try {
          const userClasses = await getUserClasses(userId);
          setClasses(userClasses);
        } catch (error) {
          console.error('Error fetching classes', error);
        }
      }
      fetchUserClasses();
      fetchUsername(userId);
    }
  }, [userId]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert(
          { errorMsg },
          'This app requires location access. Please enable location services in your device settings.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
        return;
      }

      const locationSubscription = Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 30000, distanceInterval: 1 },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
      console.log(location?.coords);
      return () => {
        locationSubscription.remove();
      };
    })();
  }, []);

  const handleDateSelect = async (date) => {
    if (date._d) {
      const selectedDate = new Date(date);

      // Use toLocaleString to format the date, specifying the options to get the full day of the week
      const options = { weekday: 'long' };
      const fullDayOfWeek = selectedDate.toLocaleString('en-US', options);

      await supabase.rpc('getclassesbyday', { day: fullDayOfWeek, user_id: userId })
        .then((response) => {
          setClassesForToday(response.data);
        })
        .catch((error) => {
          console.error(error);
          setErrorMsg(error.toString());
        })
    }
    // Here you can handle the selected date, e.g., by setting it in your component's state
  };

  const toAmPm = (date1) => {
    const date = new Date();
    const timesArray = date1.split(':');
    date.setHours(parseInt(timesArray[0]));
    date.setMinutes(parseInt(timesArray[1]));
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleString('en-US', options);
  }

  const fetchUsername = async (id) => {
    await supabase.rpc('getusernamebyid', { profile_id: id })
      .then((response) => {
        setUserName(response.data[0]?.full_name || response.data[0]?.username)
      })
      .catch((error) => {
        console.error(error)
        setErrorMsg(error)
      })
  }
  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1044a9', paddingHorizontal: 10 }}>
      <Text style={[{ color: 'white' }, { paddingTop: 20 }, { fontFamily: 'serif' }, { fontSize: 17 }, { backgroundColor: '#1044a9' }]}>   Welcome, {userName || ''} </Text>
        {}
        <Image
          source={{ uri: '../../assets/student_icon.png' }} 
          style={{ width: 38, height: 35, tintColor: 'white' }} 
        />
      </View>
      <CalendarStrip
      scrollable
      scrollerPaging
      minDate={lastYear}
      maxDate={nextYear}
      style={{ height: '15%', paddingTop: '4%', paddingBottom: '2%' }} 
      calendarColor={'#1044a9'}
      calendarHeaderStyle={{ color: 'white', fontFamily: 'serif', fontSize: 20, paddingBottom: '2%' }} 
      dateNumberStyle={{ color: 'white', fontFamily: 'serif', fontSize: 10 }} 
      dateNameStyle={{ color: 'white', fontFamily: 'serif', fontSize: 10 }} 
      highlightDateNumberStyle={{ color: 'white' }}
      selectedDateStyle={{ color: 'white', backgroundColor: 'F4A543' }}
      daySelectionAnimation={{ type: 'background', duration: '30', borderWidth: '0.1%', highlightColor: 'transparent', borderHighlightColor: 'white' }} // Adjust borderWidth with percentage
      highlightDateContainerStyle={{ backgroundColor: '#77A1F2' }}
      iconContainer={{ flex: 0.1 }}
      calendarAnimation={{ type: 'easeOut', duration: '500' }}
      headerText={customHeader}
      scrollSpeed={-0.1}
      onDateSelected={handleDateSelect}
    />
      <View style={{ backgroundColor: '#1044a9' }}>
      { classesForToday.map((element, index) => <Text key={index} style={[{ color: '#1044a9' }, { padding: 10 }, { fontFamily: 'serif' }, { fontSize: 15 }, { backgroundColor: '#D1DFFB' }, { textAlign: 'center' }]}> {element.classname}: {element.sectioncrn} {toAmPm(element.starttime[0])} - {toAmPm(element.endtime[0])} </Text>) }
      </View>
      <View style={styles.outerClassContainer}>
        {/* <Text>User Classes</Text> */}
        {/* class container- images */}
        <View style={styles.classesContainer}>
          {classes.map((classItem, index) => (
            <View key={classItem.crn} style={styles.classItem}>
              <Text>{classItem.classname}</Text>
              <Image
              source={{ uri: classItem.imageurl }}
              style={styles.image}
              resizeMode="cover"
            />
              <Text>{classItem.crn}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default UserClasses;