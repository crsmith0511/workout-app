import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import _ from "lodash";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import GoogleLoginButton from './GoogleLoginButton';

class LandingPage extends Component {

  renderPage = () => {
    console.log('props auth from landing page: ', this.props.auth)

    return (
      <React.Fragment>
        <div className="home-page">
          <div className="projects-row">
            <div className="col-md-8-offset-3 text-center">
              <div className="card col-md-offset-3 text-center" styles="width: 18rem;">
                <div className="card-body">
                  <GoogleLoginButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>

    )
  }

  render() {
    return (
      <div>{this.renderPage()}</div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(LandingPage);