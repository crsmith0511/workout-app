import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import _ from "lodash";
import { Container, Row, Col } from 'reactstrap';
import {Accordion, Card, Button, Modal} from 'react-bootstrap'
import Timer from 'react-compound-timer'
import './wod.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

// const Spotify = require('spotify-web-api-js');
// const spotifyWebAPI = new Spotify();
const token = spotifyApi.setAccessToken('BQCyj2sTaPUx4mAz7LdACCd-M6n7tu6scpSjA53xjqMwe0CK4jhrWuKEFCbe0CZD5tg9DdFpYY0c4dsPhQ_bapLusvrBpp5urEXayTpx_eIAUoo3zfbacbTfUEsyH2lXz4hZUbKmJUmq1sLPz3hGwy30-M3ovuUWNhw');

class WorkoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movementKeyCount: 1,
            round: 1,
            show : false,
            countDown: 10,
            minutes: 0,
            seconds: 0,
            movementTimer: 0,
            token: token,
            nowPlayingTitle: 'Currently Paused' 
            // albumArt: ''
        }
        // this.movementTracker = this.movementTracker.bind(this)
        this.timer = this.timer.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.countDown = this.countDown.bind(this)
        // this.getNowPlaying = this.getNowPlaying.bind(this)
    }

 

    componentDidMount(){
        this.handleShow()
        this.countDown()
        this.setState({movementTimer: this.props.workout.workout[0].movements[0].time})
        this.setState({minutes: this.props.workout.workout[0].time / 60})
        // this.getNowPlaying()
    }

    countDown = () => {
        this.myCountDownInterval = setInterval(() => {
            // console.log(this.state.count)
            if(this.state.countDown > 0){
                this.setState({
                    countDown: this.state.countDown -1
                })
            }else{
                this.stopCountDown()
                this.timer()
                this.handleClose()
                // this.movementTracker()
                // this.getNowPlaying()
            }
        }, 1000)
    }

    stopCountDown = () => {
        clearInterval(this.myCountDownInterval)
    }

   async movementTracker () {
        // this.myInterval = setInterval(() => {
            console.log('state from play wod and music', this.state)
            if(this.state.movementKeyCount < this.props.workout.workout[0].movements.length){
               await this.setState(prevState => ({
                    movementKeyCount: prevState.movementKeyCount +1
                }))
            }else{
                if(this.state.round < this.props.workout.workout[0].rounds){              
                  await this.setState(prevState => ({
                        movementKeyCount: 1,
                        round: prevState.round +1
                    }))
                }else{
                  await this.setState({
                        movementKeyCount: 1,
                        round: "DONE"
                    })
                    // this.wodIsCompleted()
                }
            }
        // }, this.state.movementTimer * 1000)
    }

    timer = () => {

       this.timerInterval = setInterval(() => {
            const { seconds, minutes } = this.state
            const{movementTimer} = this.state
            console.log('state tracked in timer', this.state)
            // console.log('movementKeyCount', this.state.movementKeyCount)
            // console.log('movementTimer', movementTimer)
            // console.log("next movement", this.props.workout.workout[0].movements[this.state.movementKeyCount])
            // console.log("next timer", this.props.workout.workout[0].movements[this.state.movementKeyCount].time)
            if(movementTimer === 0){         
              this.setState({
                    movementTimer: this.props.workout.workout[0].movements[this.state.movementKeyCount -1].time
                })
                this.movementTracker()
            }else{
               this.setState(prevState => ({
                    movementTimer: prevState.movementTimer  -1
                }))
            }
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    this.stopTimer()
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1002)
    }

    // wodIsCompleted = () => {
    //     clearInterval(this.myInterval)
    // }
    stopTimer = () => {
        clearInterval(this.timerInterval)
    }

    resume = () => {
        console.log('resume clicked')
        console.log('resume state', this.state)
        this.timer()
        // this.movementTracker()
    }

    pause = () => {
        console.log("pause clicked")
        console.log('pause state', this.state)
        // this.wodIsCompleted()
        this.stopTimer()
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleShow = () => {
        this.setState({show: true})
    } 

    // getCurrentlyPlaying(token) {
    //     // Make a call using the token
    //     $.ajax({
    //       url: "https://api.spotify.com/v1/me/player",
    //       type: "GET",
    //       beforeSend: xhr => {
    //         xhr.setRequestHeader("Authorization", "Bearer " + token);
    //       },
    //       success: data => {
    //         this.setState({
    //         //   item: data.item,
    //           nowPlayingTitle: data.is_playing,
    //         //   progress_ms: data.progress_ms
    //         });
    //       }
    //     });
    //   }

    renderHeader(){
        const { minutes, seconds } = this.state
        if(this.props.workout.workout.length === 0){
            return(
                <div></div>
            )
        }
        return(
            <Card style={{width: "100%"}}>
            <Card.Header as="h5" >
                <Row>
                    <Col xs="3" style={{textAlign: "left"}}>
                        <h4> { minutes === 0 && seconds === 0? <h1>Busted!</h1>: <h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>}</h4>
                    </Col>
                    <Col xs="6" style={{textAlign: "center"}}>
                        <FontAwesomeIcon style={{marginLeft: "5px", marginRight: "15px", marginTop: "10px"}} onClick={this.resume} icon={faPlay }/> 
                        <FontAwesomeIcon style={{marginLeft: "10px", marginRight: "10px", marginTop: "10px"}} onClick={this.pause} icon={faPause} /> 
                    </Col>
                    <Col xs="3" style={{textAlign: "right", marginTop: "12px"}}>
                        <h4>Round: {this.state.round}</h4>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body style={{height: "3rem"}}>
                <Card.Title>
                    <Row>
                    <Col xs="2">
                            <FontAwesomeIcon icon={faRss}/> 
                        </Col>
                        <Col xs="10">
                            NOW PLAYING: 
                        </Col> 
                    </Row>
                </Card.Title>
            </Card.Body>
        </Card>
        )
    }

    renderList() {

        if(this.props.workout.workout.length === 0){
            return <div>Loading...</div>; 
        }
        // console.log('this is length', this.props.workout.workout[0].movements.length)
        const movements = this.props.workout.workout[0].movements
        // console.log('waiting for workout', movements)
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
                       <Card.Title>REST BREAK</Card.Title> 
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
                          </Col>
                        </Row>

                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        }); 
    }


    renderModal (){
        if(this.state.show === true){
            return (
            <>
            <Button style={{height:".05px", width: ".05px"}}  onClick={this.handleShow}>
              Launch demo modal
            </Button>
        
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header>
                <Modal.Title><h1 style={{textAlign: "center"}}>YOUR WORKOUT STARTS IN</h1></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                 <h1 style={{textAlign: "center"}}>{this.state.countDown}</h1>
              </Modal.Body>
            </Modal>
          </>
        );
        }else{
            return (
                <div></div>
            )
        }
        

    }
    
    
  render() {
      const {movementKeyCount} = this.state
      const stringedMovementKeyCount = movementKeyCount.toString()
    return (
        <Container>
        <Row>
            {this.renderModal()}
        </Row>
        <Row style={{textAlign: "center", marginBottom: "10px"}}>
          <Col xs="12">
            {this.renderHeader()}
          </Col>
        </Row>
       <Row> 
         <Col xs="12">
            <Accordion activeKey={stringedMovementKeyCount}>
                {this.renderList()}
            </Accordion>
         </Col>
       </Row>
        </Container> 

    );
  }
}

function mapStateToProps( state ) {
    console.log(state)
  return{
	workout: state
  } 
}


export default connect(mapStateToProps, actions)(WorkoutPage);
