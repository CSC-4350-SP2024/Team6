import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './teachers_styling.js';

const TimeDetailScreen = ({ navigation }) => {
  const [option, setOption] = useState(null);
  const route = useRoute();
  const  crn  = route.params.crn;
  const classname = route.params.classname
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigations = useNavigation();


  const selectOption = (selectedOption) => {
    setOption(selectedOption);
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const isOptionSelected = (selectedOption) => {
    return option === selectedOption;
  };

  const onViewReport = () => {
    if (option === 'day' && !startDate) {
      Alert.alert('Missing Date', 'Please select a date for the day attendance report.');
      return;
    }

    if (option === 'dateInterval' && (!startDate || !endDate || endDate <= startDate)) {
      Alert.alert('Invalid Date Range', 'Please select a valid date range for the interval attendance report.');
      return;
    }

    navigations.navigate('reportScreen', { option, crn, startDate, endDate, classname });
  };

  return (
    <View style={styles.timecontainer}>
      <View style={styles.timeheader}>
        <Text style={styles.timepromptText}>Please select the type of report to generate for {classname}:</Text>
      </View>
    

      <TouchableOpacity
        style={[styles.button, isOptionSelected('semester') && styles.selectedButton]}
        onPress={() => selectOption('semester')}
        disabled={isOptionSelected('semester')}
      >
        <Text style={styles.buttonText}>Semester Attendance</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isOptionSelected('day') && styles.selectedButton]}
        onPress={() => selectOption('day')}
        disabled={isOptionSelected('day')}
      >
        <Text style={styles.buttonText}>Day Attendance</Text>
      </TouchableOpacity>

      {option === 'day' && (
        <>
        <View style={styles.datePickerContainer}>
          <Text style={styles.datePickerLabel}> Date:</Text>
          <DateTimePicker
            value={endDate}  // use endDate to set the value of DateTimePicker
            mode="date"
            display="default"
                onChange={(event, selectedDate) => setEndDate(selectedDate)}  // update endDate when changed
            />
        </View>
      </>
    )}

      <TouchableOpacity
        style={[styles.button, isOptionSelected('dateInterval') && styles.selectedButton]}
        onPress={() => selectOption('dateInterval')}
        disabled={isOptionSelected('dateInterval')}
      >
        <Text style={styles.buttonText}>Date Interval Attendance</Text>
      </TouchableOpacity>

      {option === 'dateInterval' && (
        <>
          <View style={styles.datePickerContainer}>
            <Text style={styles.datePickerLabel}>Start Date:</Text>
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => setStartDate(selectedDate)}
            />
          </View>
          <View style={styles.datePickerContainer}>
            <Text style={styles.datePickerLabel}>End Date:</Text>
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => setEndDate(selectedDate)}
            />
          </View>
        </>
      )}

      {option && (
        <TouchableOpacity
          style={[styles.button, styles.viewReportButton]}
          onPress={onViewReport}
        >
          <Text style={styles.buttonText}>View Report</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TimeDetailScreen;
