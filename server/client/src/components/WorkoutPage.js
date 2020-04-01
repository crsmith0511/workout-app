import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import * as actions from '../actions';
import { fetchWOD } from "../actions/index";
import _ from "lodash";
import { Container } from 'reactstrap';
import {ListGroup, Accordion, Card, AccordionCollapse, AccordionToggle} from 'react-bootstrap'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './wod.css';


class WorkoutPage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state={
    //         eventKey: 1
    //     }
    //     this.toggleMovements = this.toggleMovements.bind(this);
    // }
    // componentDidMount() {
    // this.myInterval = setInterval(this.toggleMovements, 3000) 
    // }

    // toggleMovements() {
    //     if(this.state.key < this.props.state.workout.lenth){
    //         this.setState({eventKey: this.state.eventKey + 1})
    //     }else{
    //         this.setState({eventKey: 1})
    //     }

    //     useAccordionToggle(eventKey, () =>
    //     console.log('toggle')
    //     );

    //     eventKey++
    // }
    
    
    renderList() {
        if(this.props.state.workout.length === 0){
            return <div>Loading...</div>; 
        }
        const movements = this.props.state.workout[0].movements
        console.log('waiting for workout', movements)
        return _.map(movements, movement => {
            if(movement.movement == "Rest"){
              return(
                <Card style={{width: "100%"}} key={movement._id}>
                    <Accordion.Toggle as={Card.Header} eventKey={movement.index}>
                    {movement.movement}
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
                    {movement.movement}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={movement.index}>
                    <Card.Body>
                    <iframe width="100" height="80" src="https://www.youtube.com/embed/C_VtOYc6j5c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        }); 
    }
    
  render() {
    return (
        <Container>
        <Accordion defaultActiveKey="0">
            {this.renderList()}
        </Accordion>
        </Container> 

    );
  }
}



function mapStateToProps( state ) {
    console.log(state)
  return{
	state
  } 
}


export default connect(mapStateToProps, actions)(WorkoutPage);

    {/* <ListGroup>
            {this.renderList()}
        </ListGroup> */}

//         <ListGroup.Item>
//         <h3>{movement.movement}</h3>
//         <p>Reps: {movement.reps}</p>
//         <p>Time: {movement.time}</p>
//    </ListGroup.Item>

    //     <Accordion defaultActiveKey="0">
    //     <Card style={{width: "100%"}}>
    //         <Accordion.Toggle as={Card.Header} eventKey="0">
    //         Click me!
    //         </Accordion.Toggle>
    //         <Accordion.Collapse eventKey="0">
    //         <Card.Body>Hello! I'm the body</Card.Body>
    //         </Accordion.Collapse>
    //     </Card>
    //     <Card style={{width: "100%"}}>
    //         <Accordion.Toggle as={Card.Header} eventKey="1">
    //         Click me!
    //         </Accordion.Toggle>
    //         <Accordion.Collapse eventKey="1">
    //         <Card.Body>Hello! I'm another body</Card.Body>
    //         </Accordion.Collapse>
    //     </Card>
    // </Accordion>