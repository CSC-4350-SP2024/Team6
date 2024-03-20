/* eslint-disable semi */
import { supabase } from '../lib/supabase';

function isUserATeacher (userid) {
  return supabase.rpc('isateacher', { userid })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return false;
    })
}

function fetchUsernameById (userId) {
  return supabase.rpc('getusernamebyid', { profile_id: userId })
    .then((response) => {
      return { data: response.data[0]?.full_name || response.data[0]?.username, error: null }
    })
    .catch((error) => {
      console.error(error)
      return { data: null, error }
    })
}

export { isUserATeacher, fetchUsernameById }
