import React, { Component }  from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as actions from '../actions';
import { fetchUser } from '../actions/index';

class Login extends Component {
  async fetchUser () {
    console.log('got to fetch user in landing page')
      await this.props.fetchUser()
  }

  renderPage = () => {
    console.log('props auth from landing page: ', this.props.auth)
    return (
      <a onClick={fetchUser} href={'http://localhost:5000/auth/spotify'} onClick={fetchUser}>Login with Spotify</a>
    )
  }

  render() {
    return (
      <div>{this.renderPage()}</div>
    )
  }
}

function mapStateToProps(state) {
  return ({
    user: state.user
  })
}

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUser }, dispatch);
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

// const Login = (props) => {
//   const
//     return (
//       <a href={'http://localhost:5000/auth/spotify'} onClick={fetchUser}>Login with Spotify</a>
//     )
//   }

//   function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ fetchUser }, dispatch);
//   }
  
//   export default connect(
//     null,
//     mapDispatchToProps,
//   )(Login);

//   // export default connect(
//   //   null,
//   //   actions
//   // )(Login);