import React, { Component } from "react";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './spotifyLoginPage'


class LandingPage extends Component {

  renderPage = () => {
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


