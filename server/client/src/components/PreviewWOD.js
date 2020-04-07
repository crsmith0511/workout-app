import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchWOD, fetchUser } from "../actions/index";
import _ from "lodash";
import { Container, Row, Col } from 'reactstrap';
import {Accordion, Card, Button} from 'react-bootstrap'
import './wod.css';
import Nav from './Nav.js'

class PreviewWOD extends Component {
    startWorkout = () => {
        this.props.history.push('/workout');
    }

    renderButton = () => {
        if(this.props.workout.workout.length === 0){
            return <div></div>
        }
        return(
          <Col>
            <Button style={{width: "50%", height: "60px", marginBottom: "20px", background: "#22212e"}} size="lg" onClick={this.startWorkout}>Start Workout</Button>
          </Col>
        )
    }
    renderDescription = () => {
        if(this.props.workout.workout.length === 0){
            return <div></div>
        }
        return(
          <Col xs="12">
            <h4>Description: {this.props.workout.workout[0].description}</h4>
          </Col>
        )
    }

    renderList = () => {

        if(this.props.workout.workout.length === 0){
            return <div>Loading...</div>
        }
        console.log('this is length', this.props.workout.workout[0].movements.length)
        const movements = this.props.workout.workout[0].movements
        console.log('waiting for workout', movements)
        return _.map(movements, movement => {
            if(movement.movement === "Rest"){
              return(
                <Card style={{width: "100%"}} key={movement._id}>
                    <Accordion.Toggle as={Card.Header} eventKey={movement.index}>
                        <Row>
                            <Col xs="8">
                                <h4 style={{textAlign: "Left", marginLeft: "5px"}}>{movement.movement}</h4>
                            </Col>
                            <Col xs="4">
                                <h5 style={{textAlign: "right"}}>Time: {movement.time}</h5>
                            </Col>
                        </Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={movement.index}>
                    <Card.Body style={{background: "#e1e5f2"}}>
                        REST BREAK
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
              )
            }
            return(
                <Card style={{width: "100%"}} key={movement._id}>
                    <Accordion.Toggle as={Card.Header} eventKey={movement.index}>
                        <Row>
                            <Col xs="8">
                                <h4 style={{textAlign: "Left", marginLeft: "5px"}}>{movement.movement}</h4>
                            </Col>
                            <Col xs="4">
                                <h5 style={{textAlign: "right"}}>Time: {movement.time}</h5>
                            </Col>
                        </Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={movement.index}>
                    <Card.Body style={{background: "#e1e5f2"}}>
                        <Row>
                          <Col xs="12">
                            <iframe width="250" height="200" src={movement.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                          <p>{movement.description}</p>
                          </Col>
                        </Row>

                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        }); 
    }
    
  render() {
    return (
        <div className="background">
        <Nav />
        <Container>
        <Row>
            <Col xsm="12" style={{textAlign: "center"}}>
            <h2>Workout Preview</h2>
            </Col>
        </Row>
        <Row>
            <Col xsm="12" style={{textAlign: "center"}}>
                {this.renderButton()}
            </Col>
        </Row>
        <Row style={{textAlign: "center", marginBottom: "10px"}}>
            {this.renderDescription()}
        </Row>
       <Row> 
         <Col xs="12">
            <Accordion >
                {this.renderList()}
            </Accordion>
         </Col>
       </Row>
        </Container> 
        </div>
    );
  }
}

function mapStateToProps( state ) {
    console.log(state)
    return{
      workout: state,
      user: state
    } 
  }
  
  function mapDispatchToProps(dispatch) {
      return bindActionCreators({ fetchWOD, fetchUser }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(PreviewWOD);
