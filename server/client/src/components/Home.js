import React, { Component } from "react";
// import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// import * as actions from '../actions';
import { fetchWOD, fetchUser } from '../actions/index';
import _ from "lodash";
import { Container, Card, Button, CardTitle, CardText, Row, Col, Modal } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';



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
  async categoryClick(event) {
    await this.setState({ category: event, categorySelected: true });
    this.renderStartWodButton()
  }

  async typeClick(event) {
    await this.setState({ type: event, typeSelected: true });
    this.renderStartWodButton()
  }

  //get workout is on the start workout button which will appear when type and category has been clicked
  async getWorkout() { 
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
          <Button color="primary" onClick={this.getWorkout}>Create Workout</Button>
        )
      }
    }
  

  render() {
    const {bodyWeightSelected} = this.state.bodyWeightSelected
    return (
        <Container>
        <Row style={{textAlign: "center", marginBottom: "10px"}}>
          <Col xs="12">
            {this.renderStartWodButton()}
          </Col>
        </Row>
        <Row> 
          <Col xs="12" style={{textAlign: "center"}}>
           <h3>CHOOSE YOUR WORKOUT TYPE</h3>
          </Col>
        </Row>
        <Row >
          <Col xsm="6">
            <Card body 
            style={{width: "100%", height:"10rem", marginBottom: "10px", marginTop: "5px"}} 
            onClick={() => this.typeClick("Body-Weight")}
            > 
              <CardTitle>BODY WEIGHT WORKOUT</CardTitle>
              <CardText>No weights. Minimial to no equipement.</CardText>
            </Card>
          </Col>
          <Col xsm="6">
            <Card body style={{width: "100%", height:"10rem", marginBottom: "10px", marginTop: "5px"}} onClick={() => this.typeClick("BarBell")}>
              <CardTitle>BARBELL WORKOUT</CardTitle>
              <CardText>Weighted workout with a barbell.</CardText>
            </Card>
          </Col>
        </Row>
        <Row> 
          <Col xs="12" style={{textAlign: "center"}}>
           <h3>CHOOSE YOUR WORKOUT LENGTH</h3>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card body style={{width: "100%", height: "7rem", marginBottom: "5px", marginTop: "5px"}} onClick={() => this.categoryClick("Short")}>SHORT WORKOUT: 10-12 MINS</Card>
          </Col> 
        </Row>
        <Row>
          <Col sm="12">
            <Card body style={{width: "100%", height: "7rem", marginBottom: "5px", marginTop: "5px"}} onClick={() => this.categoryClick("Medium")}>MEDIUM WORKOUT: 15-20 MINS</Card>
          </Col> 
        </Row>
        <Row>
          <Col sm="12">
            <Card body style={{width: "100%", height: "7rem", marginBottom: "5px", marginTop: "5px"}} onClick={() => this.categoryClick("Long")}>LONG WORKOUT: 25-30 MINS</Card>
          </Col> 
        </Row>
        </Container>
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

