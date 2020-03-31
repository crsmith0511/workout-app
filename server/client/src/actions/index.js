import axios from 'axios';
import { FETCH_USER, FETCH_WOD, NOT_AUTH_USER} from './types';

export const fetchUser = () => dispatch => {

    axios.get(`/current_user`
  
    ).then(function (response) {
      console.log("current user responded", response)
      dispatch({ type: FETCH_USER, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
      dispatch({ type: NOT_AUTH_USER, payload: error });
    });
  };

export const fetchWOD = (type) => dispatch => {
    axios.get(`/workout?${type}`
    ).then(function (response) {
      console.log('response from workout', response)
      dispatch({ type: FETCH_WOD, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  };