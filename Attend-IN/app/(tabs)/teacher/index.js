import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { getUserData, getUserClasses, getClassesByDay} from '../../service/classService.js';
import styles from './teachers_styling.js';
import { useFonts } from 'expo-font';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { fetchUsernameById } from '../../service/userService.js';
import { useNavigation } from '@react-navigation/native';

function TeacherClasses() {
  const [classes, setClasses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [classesForToday, setClassesForToday] = useState([]);
  const [userName, setUserName] = useState(null);
  const navigation = useNavigation();

  // For Calendar
  const currentDate = new Date();
  const lastYear = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
  const nextYear = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
  const startDate = moment().startOf('week').toDate();
  const endDate = moment().endOf('week').toDate();
  const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const formattedEndDate = endDate.toLocaleDateString('en-US', { day: 'numeric' });
  const customHeader = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

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

  const handleDateSelect = async (date) => {
    if (date._d) {
      const selectedDate = new Date(date);
      const options = { weekday: 'long' };
      const fullDayOfWeek = selectedDate.toLocaleString('en-US', options);

      await getClassesByDay(fullDayOfWeek, userId)
        .then((response) => {
          setClassesForToday(response.data);
        })
        .catch((error) => {
          console.error(error);
          setErrorMsg(error.toString());
        })
    }
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
    await fetchUsernameById(id)
      .then((response) => {
        setUserName(response.data)
      })
      .catch((error) => {
        console.error(error)
        setErrorMsg(error)
      })
  }

  const handleClick = (classItem) => {
    navigation.navigate('timeDetailScreen');
  };

  return (
    <ScrollView>
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
        {classesForToday.map((element, index) => <Text key={index} style={[{ color: '#1044a9' }, { padding: 10 }, { fontFamily: 'serif' }, { fontSize: 15 }, { backgroundColor: '#D1DFFB' }, { textAlign: 'center' }]}> {element.classname}: {element.sectioncrn} {toAmPm(element.starttime[0])} - {toAmPm(element.endtime[0])} </Text>)}
      </View>
      <View style={styles.outerClassContainer}>
        <View style={styles.classesContainer}>
          {classes.map((classItem, index) => {
            const startTime = classItem.startclasstimes;
            const startFormatted = startTime[1].slice(11, 20);
            const endTime = classItem.endclasstimes;
            const endFormatted = endTime[1].slice(11,20)
            const time = `${startFormatted} - ${endFormatted}`;
           
            return (
              <TouchableOpacity
                key={classItem.crn}
                style={[
                  styles.classItem,
                  index % 4 === 0 ? styles.classItemGreen :
                    index % 4 === 1 ? styles.classItemBlue :
                      index % 4 === 2 ? styles.classItemYellow :
                        styles.classItemRed
                ]}
                onPress={() => handleClick(classItem)}
              >
                <Text style={styles.className}>{classItem.classname}</Text>
                <Text style={styles.className}>{classItem.crn}</Text>
                <Text style={styles.className}>{time}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

export default TeacherClasses;
