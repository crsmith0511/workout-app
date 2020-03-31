import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions';
import queryString from "query-string";
import _ from "lodash";
import { Container, Card, Button, CardText, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Nav from './Nav';



class Home extends Component { 
    constructor () {
        super()
        
        // this.loadItems = this.loadItems.bind(this)
        
        this.state = {
          category: '',
          type: '',
          number: ''
        }
      }

   componentDidMount() {
     this.props.fetchUser()
   }
  

  render() {
    return (
        <Container>
        <Row >
          <Col sm="6" >
            <Card body style={{width: "100%"}}> 
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
          <Col sm="6" >
            <Card body style={{width: "100%"}}>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card body style={{width: "100%", height: "5rem"}}>This is some text within a card body.</Card>
          </Col> 
        </Row>
        <Row>
          <Col sm="12">
            <Card body style={{width: "100%", height: "5rem"}}>This is some text within a card body.</Card>
          </Col> 
        </Row>
        <Row>
          <Col sm="12">
            <Card body style={{width: "100%", height: "5rem"}}>This is some text within a card body.</Card>
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

export default connect(
  mapStateToProps,
  actions
)(Home);

