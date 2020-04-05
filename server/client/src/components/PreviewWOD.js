import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from '../actions';
import _ from "lodash";
import { Container, Row, Col } from 'reactstrap';
import {Accordion, Card, Button} from 'react-bootstrap'
import './wod.css';
import { faBoxTissue } from "@fortawesome/free-solid-svg-icons";

class PreviewWOD extends Component {
    startWorkout = () => {
        this.props.history.push('/workout');
    }

    renderButtonAndDescription = () => {
        if(this.props.workout.workout.length === 0){
            return <div>Loading...</div>; 
        }
        return(
            <Col xs="12">
            <Button onClick={this.startWorkout}>Start Workout</Button>
            <h5>Round: {this.props.workout.workout[0].rounds}</h5>
            <h6>Description: {this.props.workout.workout[0].description}</h6>
          </Col>
        )
    }

    renderList = () => {

        if(this.props.workout.workout.length === 0){
            return <div></div>; 
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
                            <Col xs="6">
                                <h5 style={{textAlign: "left"}}>{movement.movement}</h5>
                            </Col>
                            <Col xs="6">
                                <h5 style={{textAlign: "right"}}>Time: {movement.time}</h5>
                            </Col>
                        </Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={movement.index}>
                    <Card.Body>
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
                            <Col xs="4">
                                <h5 style={{textAlign: "left"}}>{movement.movement}</h5>
                            </Col>
                            <Col xs="4">
                                <h5 style={{textAlign: "center"}}>Reps: {movement.reps}</h5>
                            </Col>
                            <Col xs="4">
                                <h5 style={{textAlign: "right"}}>Time: {movement.time}</h5>
                            </Col>
                        </Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={movement.index}>
                    <Card.Body>
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
        <Container>
        <Row style={{textAlign: "center", marginBottom: "10px"}}>
            {this.renderButtonAndDescription()}
        </Row>
       <Row> 
         <Col xs="12">
            <Accordion >
                {this.renderList()}
            </Accordion>
         </Col>
       </Row>
        </Container> 

    );
  }
}

function mapStateToProps( state ) {
    console.log('preview state', state)
  return{
	workout: state
  } 
}


export default connect(mapStateToProps, actions)(PreviewWOD);