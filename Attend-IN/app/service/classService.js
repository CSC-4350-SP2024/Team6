/* eslint-disable semi */
import { supabase } from '../lib/supabase';

// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase project URL and key

async function getUserClasses (userId) {
  try {
    // Replace 'public' with your database name and 'classes' with your table name
    const { data, error } = await supabase.rpc('getallclasses', { userid: userId })

    if (error) {
      console.log(error);
      throw error;
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching user classes:', error.message);
    throw error;
  }
}

async function getUserData(setUserId) {
  try {
    const { data, error } = await supabase.auth.getUser(); // Fetch user data
    if (error) {
      throw error; 
    } else {
      setUserId(data.user.id); // Set the user ID in the state
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message); 

  }
}

export { getUserClasses, getUserData };


