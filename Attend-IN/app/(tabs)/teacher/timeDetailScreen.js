import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute} from '@react-navigation/native'; // Import useRoute hook

const TimeDetailScreen = ({ navigation }) => {
  const [option, setOption] = useState(null);
  const route = useRoute(); //access route object
  const { crn } = route.params; // extract crn from route.params
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigations = useNavigation();

  const selectOption = (selectedOption) => {
    setOption(selectedOption);
    // reset dates selection when other options selected
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const isOptionSelected = (selectedOption) => {
    return option === selectedOption;
  };

  const onSelectStartDate = (selectedDate) => {
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onSelectEndDate = (selectedDate) => {
    if (selectedDate) {
      // check if end date > than start date
      if (selectedDate > startDate) {
        setEndDate(selectedDate);
      } else {
        Alert.alert('Invalid End Date', 'End date must be after the start date.');
      }
    }
  };

  const onViewReport = () => {
    if (option === 'day' && !startDate) {
      Alert.alert('Select Date', 'Please select a date for Day Attendance.');
      return;
    }

    if (option === 'dateInterval' && (!startDate || !endDate || endDate <= startDate)) {
      Alert.alert(
        'Select Dates',
        'Please select valid start and end dates for Date Interval Attendance.'
      );
      return;
    }

    // navigate to report screen with selected data
    navigations.navigate('reportScreen', { option, crn, startDate, endDate });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        style={{
          marginBottom: 10,
          backgroundColor: isOptionSelected('semester') ? 'blue' : '#DDDDDD',
          padding: 10,
        }}
        onPress={() => selectOption('semester')}
        disabled={isOptionSelected('semester')}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Semester Attendance</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginBottom: 10,
          backgroundColor: isOptionSelected('day') ? 'blue' : '#DDDDDD',
          padding: 10,
        }}
        onPress={() => selectOption('day')}
        disabled={isOptionSelected('day')}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Day Attendance</Text>
      </TouchableOpacity>
      {option === 'day' && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => onSelectStartDate(selectedDate)}
        />
      )}
      <TouchableOpacity
        style={{
          marginBottom: 10,
          backgroundColor: isOptionSelected('dateInterval') ? 'blue' : '#DDDDDD',
          padding: 10,
        }}
        onPress={() => selectOption('dateInterval')}
        disabled={isOptionSelected('dateInterval')}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Date Interval Attendance</Text>
      </TouchableOpacity>
      {option === 'dateInterval' && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10 }}>Start Date:</Text>
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => onSelectStartDate(selectedDate)}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ marginRight: 10 }}>End Date:</Text>
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => onSelectEndDate(selectedDate)}
            />
          </View>
        </>
      )}
      {option && (
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: 'blue', // Change color for "View Report" button
            padding: 10,
          }}
          onPress={onViewReport}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>View Report</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TimeDetailScreen;
