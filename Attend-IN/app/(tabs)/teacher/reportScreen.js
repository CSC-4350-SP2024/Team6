import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PieChart } from 'react-native-chart-kit';
import { dayAttendanceSummary, semesterAttendanceSummary, dateIntervalAttendanceSummary } from '../../service/classService.js';
import styles from './teachers_styling.js';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const ReportScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { option, crn, startDate, endDate } = route.params;
  const classname = route.params.classname
  const [reportData, setReportData] = useState([]);
  console.log(route.params)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];
        if (option === 'semester') {
          data = await semesterAttendanceSummary(crn);
        } else if (option === 'day') {
          const formattedDate = formatDate(startDate);
          data = await dayAttendanceSummary(formattedDate, crn);
        } else if (option === 'dateInterval') {
          const formattedStartDate = formatDate(startDate);
          const formattedEndDate = formatDate(endDate);
          data = await dateIntervalAttendanceSummary(formattedEndDate, crn, formattedStartDate);
        }
        setReportData(data);
      } catch (error) {
        console.error(`Error fetching ${option} attendance summary:`, error);
        // Handle error
      }
    };

    fetchData();
  }, [option, crn, startDate, endDate, classname]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const calculatePercentages = () => {
    if (reportData.length === 0) {
      return { percentagePresent: 0, percentageAbsent: 0 };
    }
    const totalPopulation = reportData.length;
    const presentCount = reportData.filter((entry) => entry.present).length;
    const absentCount = totalPopulation - presentCount;
    const percentagePresent = Math.round((presentCount / totalPopulation) * 100);
    const percentageAbsent = Math.round((absentCount / totalPopulation) * 100);
    return { percentagePresent, percentageAbsent };
  };

  const renderReport = () => {
    const userMap = {};

    reportData.forEach((entry) => {
      const { full_name, present } = entry;
      if (!userMap[full_name]) {
        userMap[full_name] = { total: 0, presentCount: 0 };
      }
      userMap[full_name].total++;
      if (present) {
        userMap[full_name].presentCount++;
      }
    });

    const reportItems = Object.keys(userMap).map((name) => {
      const { total, presentCount } = userMap[name];
      const percentagePresent = total > 0 ? (presentCount / total) * 100 : 0;
      const status = option === 'day' ? (percentagePresent === 100 ? 'Present' : 'Absent') : `${percentagePresent.toFixed(2)}%`;
      return {
        name,
        status,
      };
    });

    return reportItems;
  };

  const renderReportItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={[styles.cellText, { flex: 3 }]}>{item.name}</Text>
        <Text style={[styles.cellText, { flex: 2, textAlign: 'center' }]}>{item.status}</Text>
      </View>
    );
  };

  const handleCloseReport = () => {
    navigation.goBack(); // Go back once to close the ReportScreen
    navigation.goBack(); // Go back again to return to the previous screen
  };

  const { percentagePresent, percentageAbsent } = calculatePercentages();
  // new stuff
  
    const handleDownloadReport = () => {
      const wb = XLSX.utils.book_new();
      const reportItems = renderReport();
      const dataArray = reportItems.map(item => [item.name, item.status]);
      const ws = XLSX.utils.aoa_to_sheet([['Name', 'Attendance Percentage'], ...dataArray]);
      XLSX.utils.book_append_sheet(wb, ws, 'Attendance Report');
      const base64 = XLSX.write(wb, {type: "base64"});
      const filename = FileSystem.documentDirectory +`${classname} Semester Attendance Report.xlsx`;
      FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64
    }).then(() => {
      Sharing.shareAsync(filename);
      
      });
    
  };
  

  return (
    <View style={{ flex: 1 }}>

      <View style={styles.header}>
        <Text style={styles.promptTitle}>ATTENDANCE REPORT:</Text>
        <Text style={styles.promptText}> {classname}</Text>
        <Text style={styles.promptText}> CRN: {crn}</Text>
        <Text style={styles.promptText}> {(option === 'dateInterval' ? `Range: ${formatDate(startDate)} - ${formatDate(endDate)}` : ``)
          || (option === 'day' ? `Date: ${formatDate(startDate)}` : ``)
          || (option === 'semester' ? `Semester Report` : ``) }</Text>

      </View>

      <Text style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>Report Details:</Text>
      
      <Text style={{ marginBottom: 10, textAlign: 'center' }}>
        {option === 'semester' ? `CRN: ${crn}` : `Date: ${formatDate(startDate)}`}
      </Text>
      
      <PieChart
          data={[
            {
              name: `% Present`,
              percentage: percentagePresent,
              color: '#2ecc71',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: `% Absent`,
              percentage: percentageAbsent,
              color: '#e74c3c',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
          ]}
          width={300}
          height={150}
          accessor="percentage"
          backgroundColor="transparent"
          paddingLeft="15"
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          }}
          absolute
      />
      <View style={styles.headerRow}>
        <Text style={[styles.cellText, { flex: 3, fontWeight: 'bold' }]}>Name</Text>
        <Text style={[styles.cellText, { flex: 2, textAlign: 'center', fontWeight: 'bold' }]}>Attendance Status</Text>
      </View>
      <FlatList
        data={renderReport()}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={<Text>No data available</Text>}
      />

      <View style={{ alignItems: 'center', marginTop: 20 }}>
      {option === 'semester' && (
          <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadReport}>
            <Text style={styles.downloadButtonText}>Download Report</Text>
          </TouchableOpacity>
        )}

      </View>
      <TouchableOpacity style={styles.closeButton} onPress={handleCloseReport}>
        <Text style={styles.closeButtonText}>Close Report</Text>
      </TouchableOpacity>
    </View>
  );
};



export default ReportScreen;
