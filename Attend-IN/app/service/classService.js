/* eslint-disable semi */
import { supabase } from '../lib/supabase';

// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase project URL and key

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

export { getUserClasses, getUserData, signClassAttendance };
