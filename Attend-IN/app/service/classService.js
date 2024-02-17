/* eslint-disable semi */
import { supabase } from '../lib/supabase';

// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase project URL and key

export default async function getUserClasses (userId) {
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
