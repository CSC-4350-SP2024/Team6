import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';

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
      return; // Handle validation or show UI feedback if needed
    }

    if (option === 'dateInterval' && (!startDate || !endDate || endDate <= startDate)) {
      return; // Handle validation or show UI feedback if needed
    }

    navigations.navigate('reportScreen', { option, crn, startDate, endDate, classname });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.promptText}>Please select the type of report to generate for {classname}:</Text>
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
            value={endDate}  // Use endDate to set the value of DateTimePicker
            mode="date"
            display="default"
                onChange={(event, selectedDate) => setEndDate(selectedDate)}  // Update endDate on change
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingTop: 0, 
  },
  header: {
    backgroundColor: '#1044a9',
    width: '100%',
    height: '20%',
    paddingVertical: 25,
    alignItems: 'center',
    marginBottom: '10%',
    borderBottomWidth: 15,
    borderColor: '#D1DFFB'
  },
  promptText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
    
  },
  button: {
    backgroundColor: '#1044a9', // Darker shade when selected
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#D1DFFB',
    borderColor: '#E3242B', // Red border
    borderWidth: 2, // Border width
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  datePickerLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  viewReportButton: {
    backgroundColor: '#E3242B', // Different color for View Report button
    marginTop: 60, 
    width: '70%',
  },
});

export default TimeDetailScreen;
