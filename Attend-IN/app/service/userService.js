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

export { isUserATeacher }
