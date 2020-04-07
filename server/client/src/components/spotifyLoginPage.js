import React, { Component }  from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as actions from '../actions';
import { fetchUser } from '../actions/index';
import { Container, Card, CardTitle, Row, Col, Button, CardHeader, CardBody, CardText} from 'reactstrap';
// import './wod.css';

class Login extends Component {
  async fetchUser () {
    console.log('got to fetch user in landing page')
      await this.props.fetchUser()
  }



  render() {
    return (
      <div className="background">
        <Container>
          <Card style={{width: "75%", height: "20rem",  margin: "5% auto"}}>
            <CardHeader className="cardHeader"><h1>WELCOME!</h1></CardHeader>
            <CardBody sytle={{background: "#e1e5f2"}}>
              <CardTitle><h3>Login With Spotify</h3></CardTitle>
              <Button style={{marginTop: "30px", height: '100px', width: "75%", background: "#37354a"}} color="primary" size="lg">
                <a style={{color: "white", font: "25px Arial, sans-serif"}} onClick={fetchUser} href={'http://localhost:5000/auth/spotify'} onClick={fetchUser}>Login</a>
              </Button>
            </CardBody>
          </Card>
        </Container>
      </div>
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
