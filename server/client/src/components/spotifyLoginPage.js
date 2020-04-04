import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';


const Login = (props) => {
    return (
      <a href={'http://localhost:5000/auth/spotify'}>Login with Spotify</a>
    )
  }


  export default connect(
    null,
    actions
  )(Login);