/* eslint-disable semi */
import { supabase } from '../lib/supabase';

// All Dates in YYYY-MM-DD format except where specified. month is 1-indexed meaning jan == 01, feb ==02 and so on

async function getUserClasses (userId) {
  try {
    // Replace 'public' with your database name and 'classes' with your table name
    const { data, error } = await supabase.rpc('getallclasses', { userid: userId })

    if (error) {
      console.error(error);
      return { error: 'Failed to retrieve user classes' }
    }
    return data;
  } catch (error) {
    console.error('Error fetching user classes:', error.message);
    return { error: 'Failed to retrieve user classes' }
  }
}

async function getUserData (setUserId) {
  await supabase.auth.getUser()
    .then((response) => {
      if (response.error) throw response.error;
      setUserId(response.data.user.id)
    })
    .catch((error) => {
      console.error('Error fetching user data:', error.message);
    })
}

// call this function to sign a user in the dataabse
async function signClassAttendance (userId, crn, formattedDate) {
  try {
    const { data, error } = await supabase.rpc('signattendance', { userid: userId, crn1: crn})
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
  const lat1 = userLat * Math.PI / 180; // convert user's latitude to radians
  const lon1 = userLong * Math.PI / 180; // convert user's longitude to radians
  const lat2 = classLat * Math.PI / 180; // convert class's latitude to radians
  const lon2 = classLong * Math.PI / 180; // convert class's longitude to radians
  const diffLat = lat2 - lat1;
  const diffLon = lon2 - lon1;

  const sinLat = Math.sin(diffLat / 2) * Math.sin(diffLat / 2);
  const cosLat = Math.cos(lat1) * Math.cos(lat2);
  const sinLon = Math.sin(diffLon / 2) * Math.sin(diffLon / 2);
  const firstPart = sinLat + cosLat * sinLon;
  const distance = R * (2 * Math.atan2(Math.sqrt(firstPart), Math.sqrt(1 - firstPart)));

  return distance;
}

function isWithinDistance(userLong, userLat, classLong, classLat) {
  if (haversineDistanceFormula(userLong, userLat, classLong, classLat) <= 200) {
    return true
  }
  return false
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
        for (let i = 0; i < startTimes.length; i++) {
          if (isCurrentTimeWithinHours(startTimes[i], currentTime, endTimes[i])) {
            return true; // Return true if the current time is within any of the time ranges
          }
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

function isCurrentTimeWithinHours(earlierTime, currentTime, laterTime) {
  earlierTime = new Date(earlierTime);
  laterTime = new Date(laterTime)
  currentTime = new Date(currentTime)
  // Extract the hours and minutes from the given time and current time
  const earlyHours = earlierTime.getHours();
  const earlyMinutes = earlierTime.getMinutes();

  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const laterHours = laterTime.getHours();
  const laterMinutes = laterTime.getMinutes();

  // Calculate the absolute difference in minutes
  const diffInMinutes = (currentHours - earlyHours) * 60 + (currentMinutes - earlyMinutes);

  // Check if the difference is within the range of hours
  return diffInMinutes >= 0 && diffInMinutes <= (laterHours - earlyHours) * 60 + (laterMinutes - earlyMinutes);

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
  // How To use the function, call with =>  |  await semesterAttendanceSummary(43350);  |
  return supabase.rpc('attendanceoverallsummary', { sectioncrn })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return { data: null, error: 'Error fetching data' };
    })
}

async function dayAttendanceSummary (classdate, sectioncrn) {
  // How To use the function, call with => |  await dayAttendanceSummary('2024-03-05', 43350)  |

  // check if date is valid i.e. classdate <= todaysDate & classdate >= firstDate of class
  return supabase.rpc('getclassinfo', { sectioncrn })
    .then((response) => {
      if (response.error) return [];
      const eariestStartDate = response.data[0].startClassTimes[0];

      const givenDate = new Date(classdate);

      // Check if the given date is less than today's date
      if (givenDate >= new Date().setHours(0, 0, 0, 0) || givenDate < new Date(eariestStartDate).setHours(0, 0, 0, 0)) return [];

      // if class date is valid, then query the db for attendance summary
      return supabase.rpc('attendancedaysummary', { classdate, sectioncrn })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error(error);
          return [];
        })
    })
    .catch((error) => {
      console.error(error);
      return [];
    })
}

function dateIntervalAttendanceSummary (enddate, sectioncrn, startdate) {
  //  How To use the function, call with =>  |  await dateIntervalAttendanceSummary('2024-03-13', 43350, '2024-03-02');   |

  // check if dates are valid i.e. startdate <= todaysDate and startdate >= firstClassDate and enddate <= todaysDate and enddate >= firstClassDate
  return supabase.rpc('getclassinfo', { sectioncrn })
    .then((response) => {
      if (response.error) return [];
      const eariestStartDate = response.data[0].startClassTimes[0];

      const startDate = new Date(startdate);
      const endDate = new Date(enddate)
      const todaysDate = new Date().setHours(0, 0, 0, 0);
      const earliestClassDate = new Date(eariestStartDate).setHours(0, 0, 0, 0);

      // Check if the given date is less than today's date
      if (startDate >= todaysDate || startDate < earliestClassDate || endDate >= todaysDate || endDate <= earliestClassDate) return [];

      // if class date is valid, then query the db for attendance summary
      return supabase.rpc('attendanceintervalsummary', { enddate, sectioncrn, startdate })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error(error);
          return { data: null, error: 'Error fetching data' };
        })
    })
    .catch((error) => {
      console.error(error);
      return [];
    })
}

function getClassesByDay (day, userId) {
  return supabase.rpc('getclassesbyday', { day: day, user_id: userId })
    .then((response) => {
      return { data: response.data, error: null };
    })
    .catch((error) => {
      console.error(error);
      return { data: null, error: error.toString()};
    })
}

export { getUserClasses, getUserData, signClassAttendance, haversineDistanceFormula, getClassesByDay, isWithinTenMinutesBeforeStartTimeOrEndTime, isWithinDistance, isAttendanceAlreadySigned};
