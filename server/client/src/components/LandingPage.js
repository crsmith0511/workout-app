import React, { Component } from "react";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../landingPage.css';
import Login from './spotifyLoginPage'


class LandingPage extends Component {

  renderPage = () => {
    console.log('props auth from landing page: ', this.props.auth)
    return (
      <div className="background">
        <Login />
      </div>
    )
  }

  render() {
    return (
      <div className="background">
        {this.renderPage()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return ({
    user: state.user
  })
}

export default connect(
  mapStateToProps,
)(LandingPage);


