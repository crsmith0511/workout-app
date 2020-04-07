import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Nav from './Nav.js'
import { fetchWOD, fetchUser } from '../actions/index';
import _ from "lodash";
import { Container, Card, Button, CardTitle, CardText, Row, Col, Modal } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './wod.css';

class Home extends Component { 
    constructor () {
        super()
         
        this.state = {
          category: '',
          categorySelected: false,
          type: '',
          typeSelected: false,
          bodyWeightSelected: false,
          barBellSelected: false,
          shortSelected: false,
          mediumSelected: false,
          longSelected: false,
        }
        this.categoryClick = this.categoryClick.bind(this)
        this.typeClick = this.typeClick.bind(this)
        this.getWorkout = this.getWorkout.bind(this)
    }

  componentDidMount = () => {
    this.props.fetchUser()
  }  
  categoryClick(event) {
    this.setState({ category: event, categorySelected: true });
    this.renderStartWodButton()
  }

  typeClick(event) {
    this.setState({ type: event, typeSelected: true });
    this.renderStartWodButton()
  }

  //get workout is on the start workout button which will appear when type and category has been clicked
  getWorkout() { 
      this.setState({show: false})
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      const workoutNumber = getRandomInt(1, 3)
      this.props.fetchWOD(this.state.category, this.state.type, workoutNumber)
      this.setState({category: '', categorySelected: false, type: '', typeSelected: false, showWorkoutButton: false})
      this.props.history.push('/preview');
  }

  renderStartWodButton = () => {
      if(this.state.categorySelected === true && this.state.typeSelected === true){
        return(
          <Button style={{width: "50%", height: "75px", background: "#22212e" }} size="lg" onClick={this.getWorkout}>Create Workout</Button>
        )
      }
  }
  render() {
    const {bodyWeightSelected} = this.state.bodyWeightSelected
    return (
      <div className="background">
        <Nav />
        <Container>
        <Row style={{textAlign: "center", marginBottom: "10px"}}>
          <Col xs="12">
            {this.renderStartWodButton()}
          </Col>
        </Row>
        <Row style={{marginTop: "5px", marginBottom: "5px"}}> 
          <Col xs="12" style={{textAlign: "center", color: "#22212e"}}>
           <h3>CHOOSE YOUR WORKOUT TYPE</h3>
          </Col>
        </Row>
        <Row >
          <Col xsm="6">
            <Card body 
            style={{width: "100%", height:"10rem", marginBottom: "15px", marginTop: "5px"}} 
            onClick={() => this.typeClick("Body-Weight")}
            > 
              <CardText>
              <h5 style={{padding: "30px 0"}}>BODY WEIGHT WORKOUT</h5>
              </CardText>
            </Card>
          </Col>
          <Col xsm="6">
            <Card body style={{width: "100%", height:"10rem", marginBottom: "15px", marginTop: "5px"}} onClick={() => this.typeClick("BarBell")}>
              <CardText>
                <h5 style={{padding: "30px 0"}}>BARBELL WORKOUT</h5>
              </CardText>
            </Card>
          </Col>
        </Row>
        <Row> 
          <Col xs="12" style={{textAlign: "center", marginBottom: "10px", marginTop: "5px"}}>
           <h3>CHOOSE YOUR WORKOUT LENGTH</h3>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card body style={{width: "100%", height: "7rem", marginBottom: "5px", marginTop: "5px", alignItems: "center"}} onClick={() => this.categoryClick("Short")}>
              <h4 style={{padding: "20px 0"}}>SHORT WORKOUT: 10-12 MINS</h4>
            </Card>
          </Col> 
        </Row>
        <Row>
          <Col sm="12">
            <Card body style={{width: "100%", height: "7rem", marginBottom: "5px", marginTop: "5px"}} onClick={() => this.categoryClick("Medium")}>
              <h4 style={{padding: "20px 0"}}>MEDIUM WORKOUT: 15-20 MINS</h4>
            </Card>
          </Col> 
        </Row>
        <Row>
          <Col sm="12">
            <Card body style={{width: "100%", height: "7rem", marginBottom: "5px", marginTop: "5px"}} onClick={() => this.categoryClick("Long")}>
              <h4 style={{padding: "20px 0"}}>LONG WORKOUT: 25-30 MINS</h4>
            </Card>
          </Col> 
        </Row>
        </Container>
      </div>

    );
  }
}

function mapStateToProps(state) {
  console.log('Home page state: ', state)
  return ({
    user: state.user
  })
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWOD, fetchUser }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

