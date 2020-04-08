import React, { Component }  from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as actions from '../actions';
import { fetchUser } from '../actions/index';
import { Container, Card, CardTitle, Row, Col, Button, CardHeader, CardBody, CardText, CardFooter} from 'reactstrap';

class Login extends Component {
  async fetchUser () {
      await this.props.fetchUser()
  }

  render() {
    return (
      <div className="background">
        <Container>
          <Card style={{width: "75%", height: "20rem",  margin: "5% auto", background: "#e1e5f2"}}>
            <CardHeader className="cardHeader" style={{background: "#9fa6be"}}><h1>WELCOME!</h1></CardHeader>
            <CardBody style={{background: "#e1e5f2"}}>
              <CardTitle style={{background: "#e1e5f2"}}>
                <h3>Login With Spotify</h3>
              </CardTitle>
              <Button style={{marginTop: "30px", height: '60px', width: "90%", background: "#37354a"}} size="lg">
              <a style={{color: "#ebebed", font: "25px Arial, sans-serif"}} onClick={fetchUser} href={'http://localhost:5000/auth/spotify'} onClick={fetchUser}>Login</a>
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

