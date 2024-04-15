import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { dayAttendanceSummary, semesterAttendanceSummary, dateIntervalAttendanceSummary } from '../../service/classService.js';

const ReportScreen = ({ navigations }) => {
  const route = useRoute();
  const { option, crn, startDate, endDate } = route.params;
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (option === 'semester') {
          const data = await semesterAttendanceSummary(crn);
          setReportData(data);
        } else if (option === 'day') {
          const formattedDate = formatDate(startDate);
          const data = await dayAttendanceSummary(formattedDate, crn);
          setReportData(data);
        } else if (option === 'dateInterval') {
          const formattedStartDate = formatDate(startDate);
          const formattedEndDate = formatDate(endDate);
          const data = await dateIntervalAttendanceSummary(formattedEndDate, crn, formattedStartDate);
            setReportData(data);
        }
      } catch (error) {
        console.error(`Error fetching ${option} attendance summary:`, error);
        // Handle error
      }
    };

    fetchData();
  }, [option, crn, startDate, endDate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const renderReport = () => {
    if (option === 'day') {
      return reportData.map((entry) => {
        const { full_name, present } = entry;
        const status = present ? 'Present' : 'Absent';
        return { name: full_name, status };
      });
    } else {
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

      return Object.keys(userMap).map((name) => {
        const { total, presentCount } = userMap[name];
        const percentage = total > 0 ? (presentCount / total) * 100 : 0;
        return { name, percentage };
      });
    }
  };

  const renderReportItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={[styles.cellText, { flex: 3 }]}>{item.name}</Text>
        <Text style={[styles.cellText, { flex: 2, textAlign: 'center' }]}>{item.status || `${item.percentage.toFixed(2)}%`}</Text>
      </View>
    );
  };

  const renderReportHeader = () => {
    return (
      <View style={styles.row}>
        <Text style={[styles.cellText, { flex: 3, fontWeight: 'bold' }]}>Name</Text>
        <Text style={[styles.cellText, { flex: 2, fontWeight: 'bold', textAlign: 'center' }]}>
          {option === 'day' ? 'Status' : 'Attendance Percentage'}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Report Details:</Text>
      <Text style={{ marginBottom: 10 }}>
        {option === 'semester' ? `CRN: ${crn}` : `Date: ${formatDate(startDate)}`}
      </Text>
      <FlatList
        data={renderReport()}
        renderItem={renderReportItem}
        ListHeaderComponent={renderReportHeader}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  cellText: {
    fontSize: 16,
  },
});

export default ReportScreen;
