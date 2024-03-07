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


export { getUserClasses, getUserData, signClassAttendance, haversineDistanceFormula };
