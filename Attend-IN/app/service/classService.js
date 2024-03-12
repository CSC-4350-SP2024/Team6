/* eslint-disable semi */
import { supabase } from '../lib/supabase';
import '../global'

// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase project URL and key

async function getUserClasses (userId) {
  try {
    // Replace 'public' with your database name and 'classes' with your table name
    const { data, error } = await supabase.rpc('getallclasses', { userid: userId })

    if (error) {
      console.error(error);
      return { error: 'Failed to retrieve user classes' }
    }
    data.forEach(element => {
      if (element.isteacher) global.isTeacher = true;
    });
    return data;
  } catch (error) {
    console.error('Error fetching user classes:', error.message);
    return { error: 'Failed to retrieve user classes' }
  }
}

async function getUserData (setUserId) {
  try {
    const { data, error } = await supabase.auth.getUser(); // Fetch user data
    if (error) {
      throw error
    } else {
      setUserId(data.user.id); // Set the user ID in the state
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
  }
}

// call this function to sign a user in the dataabse
async function signClassAttendance (userId, crn) {
  try {
    const { data, error } = await supabase.rpc('signattendance', { userid: userId, crn1: crn })
    if (error) {
      return { error: 'Failed to sign attendance' }
    } else {
      return data[0];
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return { error: 'Failed to sign Attendance' }
  }
}

// formula to get meters between two geographical coordinates.
function haversineDistanceFormula (userLong, userLat, classLong, classLat) {
  const R = 6371e3; // radius of the earth in meters
  const lat1 = Math.toRadians(userLat);
  const lon1 = Math.toRadians(userLong);
  const lat2 = Math.toRadians(classLat);
  const lon2 = Math.toRadians(classLong);
  const diffLat = lat2 - lat1;
  const diffLon = lon2 - lon1;

  const sinLat = Math.sin(diffLat / 2) * Math.sin(diffLat / 2);
  const cosLat = Math.cos(lat1) * Math.cos(lat2);
  const sinLon = Math.sin(diffLon / 2) * Math.sin(diffLon / 2);
  const firstPart = sinLat + cosLat * sinLon;
  const distance = R * (2 * Math.atan2(Math.sqrt(firstPart), Math.sqrt(1 - firstPart)));

  return distance;
}

async function isWithinTenMinutesBeforeStartTimeOrEndTime (sectioncrn) {
  return supabase.rpc('getclasstimedetails', { sectioncrn })
    .then(response => {
      const data = response.data[0];

      // get the current day and timestamp
      const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' }).toUpperCase();
      const currentTime = new Date();

      // get the days and dates to test against
      const testDays = data.days.map((element) => element.trim());
      const startTimes = data.startclasstimes.map((element) => element.trim());
      const endTimes = data.endclasstimes.map((element) => element.trim());

      // start the testing
      if (testDays.includes(currentDay)) {
        for (const targetTime of startTimes) {
          if (isDayOfTimestamp(targetTime, currentDay) && isCurrentTimeTenMinutesEarlierOfStartTime(targetTime, currentTime)) return true;
        }
        for (const targetTime of endTimes) {
          if (isDayOfTimestamp(targetTime, currentDay) && isCurrentTimeTenMinutesLaterOfEndTime(targetTime, currentTime)) return true;
        }
      }
      return false;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      return false;
    })
}

async function isAttendanceAlreadySigned (sectioncrn, myuserid, mydate) {
  return supabase.rpc('checkifattendanceexists', {
    mydate,
    myuserid,
    sectioncrn
  })
    .then((response) => {
      return response.data ? response.data : false;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      return false;
    });
}

function isCurrentTimeTenMinutesEarlierOfStartTime (laterTime, earlierTime) {
  laterTime = new Date(laterTime);
  // Extract the hours and minutes from the given time and current time
  const givenHours = laterTime.getHours();
  const givenMinutes = laterTime.getMinutes();
  const nowHours = earlierTime.getHours();
  const nowMinutes = earlierTime.getMinutes();

  // Calculate the absolute difference in minutes
  const diffInMinutes = (givenHours - nowHours) * 60 + (givenMinutes - nowMinutes);

  // Check if the difference is within 10 minutes
  return diffInMinutes >= 0 && diffInMinutes <= 10;
}

function isCurrentTimeTenMinutesLaterOfEndTime (earlierTime, laterTime) {
  earlierTime = new Date(earlierTime);
  // Extract the hours and minutes from the given time and current time
  const givenHours = earlierTime.getHours();
  const givenMinutes = earlierTime.getMinutes();
  const nowHours = laterTime.getHours();
  const nowMinutes = laterTime.getMinutes();

  // Calculate the absolute difference in minutes
  const diffInMinutes = (nowHours - givenHours) * 60 + (nowMinutes - givenMinutes);

  // Check if the difference is within 10 minutes
  return diffInMinutes >= 0 && diffInMinutes <= 10;
}

function isDayOfTimestamp (timestamp, day) {
  // Parse the timestamp string to a Date object
  const date = new Date(timestamp);

  // Get the day of the week as a number (0 for Sunday, 1 for Monday, etc.)
  const dayOfWeek = date.getDay();

  // Convert the number to the corresponding day name in uppercase
  const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const dayName = dayNames[dayOfWeek];

  // Compare the day name with the given day name
  return dayName === day;
}

function semesterAttendanceSummary (sectioncrn) {
  return supabase.rpc('attendanceoverallsummary', { sectioncrn })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return { data: null, error: 'Error fetching data' };
    })
}

function dayAttendanceSummary (classdate, sectioncrn) {
  // check if date is valid i.e. classdate <= todaysDate & classdate >= firstDate of class
  return supabase.rpc('attendancedaysummary', { classdate, sectioncrn })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error(error);
      return { data: null, error: 'Error fetching data' };
    })
}

function dateIntervalAttendanceSummary (enddate, sectioncrn, startdate) {
  // check if dates are valid i.e. startdate <= todaysDate and startdate >= firstClassDate and enddate <= todaysDate and enddate >= firstClassDate
  return supabase.rpc('attendanceintervalsummary', { enddate, sectioncrn, startdate })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error(error);
      return { data: null, error: 'Error fetching data' };
    })
}

export { getUserClasses, getUserData, signClassAttendance, haversineDistanceFormula };
