import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { fetchWOD } from '../actions/index';
import _ from "lodash";
import { Container, Card, Button, CardTitle, CardText, Row, Col, Modal } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
// import Nav from './Nav';



class Home extends Component { 
    constructor () {
        super()
         
        this.state = {
          category: '',
          categorySelected: false,
          type: '',
          typeSelected: false,
          isVisible: false
        }
        this.categoryClick = this.categoryClick.bind(this)
        this.typeClick = this.typeClick.bind(this)
        this.showWorkoutButton = this.showWorkoutButton.bind(this)
        this.getWorkout = this.getWorkout.bind(this)
    }

//    componentDidMount() { 
//     //  this.props.fetchUser()
//    }

  async categoryClick(event) {
    console.log('clicked?')
    console.log(event)
    await this.setState({ category: event, categorySelected: true });
    console.log('category state: ', this.state.category)
    this.renderStartWodButton()
  }

  async typeClick(event) {
    console.log(event)
    await this.setState({ type: event, typeSelected: true });
    console.log('type state: ', this.state.type)
    this.renderStartWodButton()
  }

  async getWorkout() { 
      this.setState({show: false})
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      const workoutNumber = getRandomInt(1, 4)
      this.props.fetchWOD(this.state.category, this.state.type, workoutNumber)
      this.setState({category: '', categorySelected: false, type: '', typeSelected: false, show: false})
      this.props.history.push('/workout');
  }

  showWorkoutButton(){
    this.setState({show: true})
  }

  renderStartWodButton(){
      if(this.state.categorySelected === true && this.state.typeSelected){
        this.showWorkoutButton()
      }
    }
  

  render() {
    return (
        <Container>
        <Row style={{textAlign: "center"}}>
          <Col xs="12">
            <Button onClick={this.getWorkout}>Start Workout</Button>
          </Col>
        </Row>
        <Row> 
          <Col xs="12" style={{textAlign: "center"}}>
           <h3>CHOOSE YOUR WORKOUT TYPE</h3>
          </Col>
        </Row>
        <Row >
          <Col xsm="6">
            <Card body style={{width: "100%", height:"10rem", marginBottom: "5px", marginTop: "5px"}} value="Body-Weight" onClick={() => this.typeClick("Body-Weight")} > 
              <CardTitle>BODY WEIGHT WORKOUT</CardTitle>
              <CardText>No weights. Minimial to no equipement.</CardText>
            </Card>
          </Col>
          <Col xsm="6">
            <Card body style={{width: "100%", height:"10rem", marginBottom: "5px", marginTop: "5px"}} onClick={() => this.typeClick("BarBell")}>
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
  return ({
    homePage: state.home,
    user: state.user
  })
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWOD }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

