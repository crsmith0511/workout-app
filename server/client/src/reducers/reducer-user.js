import { FETCH_USER, NOT_AUTH_USER } from '../actions/types';

//NEED TO DO
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USER:
      state = []
      return action.payload;
    case NOT_AUTH_USER:
      return []
    default:
      return state;
  }
}