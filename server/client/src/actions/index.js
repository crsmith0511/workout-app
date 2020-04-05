import axios from 'axios';
import { FETCH_USER, FETCH_WOD, NOT_AUTH_USER} from './types';

const ROOT_URL = 'http://localhost:5000'

export const fetchUser = () => dispatch => {
  console.log('fetch user in action')

    axios.get(`${ROOT_URL}/auth/spotify/current_user`
  
    ).then(function (response) {
      console.log("current user responded", response)
      dispatch({ type: FETCH_USER, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
      dispatch({ type: NOT_AUTH_USER, payload: error });
    });
};

export const fetchWOD = (category, type, number) => dispatch => {
    axios.get(`${ROOT_URL}/workout?category=${category}&type=${type}&number=${number}`
    // axios.get(`${ROOT_URL}/workout?category=Short&type=Body-Weight&number=2`
    ).then(function (response) {
      console.log('response from workout', response)
      dispatch({ type: FETCH_WOD, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};