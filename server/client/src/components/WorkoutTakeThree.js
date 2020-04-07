import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchWOD, fetchUser } from "../actions/index";
import _ from "lodash";
import { Container, Row, Col } from 'reactstrap';
import {Accordion, Card, Button, Modal} from 'react-bootstrap'
import './wod.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faFastBackward, faFastForward } from "@fortawesome/free-solid-svg-icons";

class WorkoutTakeThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movementKeyCount: 1,
            round: 1, 
            show : false,
            running: true,
            countDownTime: 10,
            movementTimer: 0,
            index: 0,
            token: '',
            nowPlaying: {
                nowPlayingTitle: 'Currently Paused' , 
                nowPlayingArtist: '',
                nowPlayingAlbumnCover: '',
                deviceId: ''
            }
        };
        this.changeAccordionMovement = this.changeAccordionMovement.bind(this)
        this.timer = this.timer.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.countDown = this.countDown.bind(this)
        this.stopCountDown = this.stopCountDown.bind(this)
        this.getNowPlaying = this.getNowPlaying.bind(this)
    }

    componentDidMount(){
        this.handleShow()
        this.countDown()
        this.setState({
            movementTimer: this.props.workout.workout[0].movements[0].time,
            token: this.props.user[0].accessToken
        })
         this.getNowPlaying()
    }

    countDown = () => {
        this.myCountDownInterval = setInterval(() => {
            if(this.state.countDownTime > 0){
                this.setState({
                    countDownTime: this.state.countDownTime -1
                })
            }else{
                this.timer()
                this.changeAccordionMovement()
                this.handleClose()
                this.playMusic() 
                this.stopCountDown()
            }
        }, 1000)
    }

    stopCountDown = () => {
        clearInterval(this.myCountDownInterval)
        this.setState({countDownTime: 10})
    }

    changeAccordionMovement = () => {
        this.myInterval = setInterval(() => {
            if(this.state.movementKeyCount < this.props.workout.workout[0].movements.length){
              this.setState(prevState => ({
                movementKeyCount: prevState.movementKeyCount +1
              }))
            }else{
                if(this.state.round < this.props.workout.workout[0].rounds){          
                    this.setState(prevState => ({
                        movementKeyCount: 1,
                        round: prevState.round +1
                    }))
                }else{ 
                    this.setState({
                        movementKeyCount: 1,
                        round: "DONE"
                    })
                    this.stopAccordion()
                    this.workoutIsComplete()
                }
            }
        }, this.state.movementTimer * 1001)
    }

    timer = () => {
        this.timerInterval = setInterval(() => {
            const indexNumber = this.props.workout.workout[0].movements[this.state.movementKeyCount -1].time
            if(this.state.movementTimer === 1){    
                this.setState({
                     movementTimer: indexNumber
                })
            }else{
               this.setState(prevState => ({
                      movementTimer: prevState.movementTimer  -1
                  }))
            }
            if(this.state.round === 'DONE'){
                  this.setState({movementTimer: 0})
                  this.stopTimer()
              }
        }, 999)
    }

    stopAccordion = () => {
        this.pauseMusic()
        clearInterval(this.myInterval)
    }
    stopTimer = () => {
        this.pauseMusic()
        clearInterval(this.timerInterval)
    }

    resume = () =>{
        this.handleShow()
        this.countDown()
        this.setState({running: true})
    }

    pause = () => {
        this.stopAccordion()
        this.stopTimer()
        this.pauseMusic()
        this.setState({running: false})
    }

    stopWorkout = () =>{
        // this.stopAccordion()
        // this.timer()
        this.pause()
        this.props.history.push('/home')
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleShow = () => {
        this.setState({show: true})
    } 

    workoutIsComplete = () =>{
        this.props.history.push('/post-workout');
    } 


   getNowPlaying = () => {
       fetch('https://api.spotify.com/v1/me/player',{
            headers:{'Authorization': `Bearer ${this.props.user[0].accessToken}` }
            }).then(response => response.json())
            .then((data) => {
                console.log('player data ', data)
                this.setState({
                    nowPlaying: { 
                        deviceId: data.device.id 
                    }
                });
        })

        fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers:{'Authorization': `Bearer ${this.props.user[0].accessToken}`}
            }).then(response => response.json())
            .then((data) => {
               console.log('currently-playing ', data.item)
               this.setState({
                    nowPlaying: { 
                        nowPlayingTitle: data.item.name, 
                        nowPlayingArtist: data.item.artists[0].name || '',
                        nowPlayingAlbumnCover: data.item.album.images[2].url
                    }
                });
            })
    }

    playMusic = () =>{

        fetch("https://api.spotify.com/v1/me/player/play?device_id=46774e015437f413e0c92f34d8b3d30b2334ea74", {
            method: "PUT",
            // body: {
            //     "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
            //     "offset": {
            //       "position": 5
            //     },
            //     "position_ms": 0
            //   },
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${this.state.token}` ,
                "Content-Type": "application/json"
            }
        })
        this.getNowPlaying()
    }

    pauseMusic = () =>{

        fetch('https://api.spotify.com/v1/me/player/pause', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.token}`
            }
        })
    }

    skipForward = () =>{
        fetch('https://api.spotify.com/v1/me/player/next', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.token}`
            }
        })
        this.getNowPlaying()
    }

    skipBackward = () =>{
        fetch('https://api.spotify.com/v1/me/player/previous', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.state.token}`
            }
        })
        this.getNowPlaying()
    }

    renderPlayOrPause(){

        if(this.state.running === true){
            return(
                <FontAwesomeIcon className="fa-2x" style={{marginLeft: "5px", marginRight: "5px", marginTop: "10px"}} onClick={this.pause} icon={faPause} /> 
            )
        }
        if(this.state.running === false){
            return( 
                <FontAwesomeIcon className="fa-2x" style={{marginLeft: "5px", marginRight: "5px", marginTop: "10px"}} onClick={this.resume} icon={faPlay }/>
            ) 
        }
    }
    renderHeader(){
        const { movementTimer } = this.state
        if(this.props.workout.workout.length === 0){
            return(
                <div></div>
            )
        }
        return(
            <Card style={{width: "100%"}}>
            <Card.Header as="h6" style={{height: "5rem"}} >
                <Row>
                    <Col xs="4" style={{textAlign: "left"}}>
                        {/* <h4>:{this.state.movementTimer}</h4> */}
                        <h1>:{movementTimer < 10 ? `0${movementTimer}` : movementTimer}</h1>
                        {/* <h4> { minutes === 0 && seconds === 0? <h1>Busted!</h1>: <h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>}</h4> */}
                    </Col>
                    <Col xs="4" style={{textAlign: "center"}}>
                       <FontAwesomeIcon onClick={this.skipBackward} className="fa-2x" style={{marginRight: "10px", marginTop: "10px"}} icon={faFastBackward} /> 
                        {this.renderPlayOrPause()}
                        <FontAwesomeIcon onClick={this.skipForward} className="fa-2x" style={{marginLeft: "10px", marginRight: "10px", marginTop: "10px"}} icon={faFastForward} /> 
                    </Col>
                    <Col xs="4" style={{textAlign: "right", marginTop: "12px"}}>
                        <h4>Round: {this.state.round}/{this.props.workout.workout[0].rounds}</h4>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body style={{height: "3rem", background: "#e1e5f2"}}>
                    <Card.Title>
                        <Row>
                            <h6 style={{fontWeight: "bold", float: "left", marginLeft:"10px"}}>{this.state.nowPlaying.nowPlayingTitle}</h6>
                            <h6 style={{color: "#808080", float: "right", marginLeft: "5px"}}>{this.state.nowPlaying.nowPlayingArtist}</h6>
                        </Row>
                    </Card.Title>
            </Card.Body>
            </Card>
        )
    }

    renderAccordion() {
        if(this.props.workout.workout.length === 0){
            return <div>Loading...</div>; 
        }

        const movements = this.props.workout.workout[0].movements
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
                                <h5 style={{textAlign: "right"}}>Time :{movement.time < 10 ? `0${movement.time}` : movement.time}</h5>
                            </Col>
                        </Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={movement.index}>
                    <Card.Body style={{background: "#e1e5f2"}}>
                       <Card.Title>REST BREAK</Card.Title> 
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
              )
            }
            return(
                <Card style={{width: "100%"}} key={movement._id}>
                    <Accordion.Toggle  as={Card.Header} eventKey={movement.index}>
                        <Row>
                            <Col xs="8">
                                <h4 style={{textAlign: "Left", marginLeft: "5px"}}>{movement.movement}</h4>
                            </Col>
                            <Col xs="4">
                                <h5 style={{textAlign: "right"}}>Time :{movement.time < 10 ? `0${movement.time}` : movement.time}</h5>
                            </Col>
                        </Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={movement.index}>
                    <Card.Body style={{background: "#e1e5f2"}}>
                        <Row>
                          <Col xs="12" onClick={this.pause}>
                          <iframe width="350" height="200" src={movement.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                          </iframe>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="12">
                          <h5>Click The Pause Button Up Top to Watch This Video.</h5>
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
            <Button style={{height:".05px", width: ".05px", background: "#e7e6eb", color: "#e7e6eb"}}  onClick={this.handleShow}>
              Launch demo modal
            </Button>
        
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header>
                <Modal.Title><h1 style={{textAlign: "center", color: "#080f47"}}>YOUR WORKOUT STARTS IN</h1></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                 <h1 style={{textAlign: "center", color: "#080f47"}}>{this.state.countDownTime}</h1>
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

  renderStopWorkout (){
    if(this.props.workout.workout.length === 0){
        return <div></div> 
    }
    return(
        <Button style={{width: "100%", height: "60px", marginBottom: "20px", background: "#37354a"}} size="lg" onClick={this.stopWorkout}>
            Stop Workout And Return To Home Page
        </Button>
    )
 }
    
  render() {
      const {movementKeyCount} = this.state
      const stringedMovementKeyCount = movementKeyCount.toString()
    return (
      <div className="background">
        <Container style={{marginTop: "15px"}}>
            <Row style={{textAlign: "center", marginBottom: "10px"}}>
                <Col xsm="12" style={{textAlign: "center"}}>
                    {this.renderStopWorkout()}
                </Col>
            </Row>
            <Row style={{textAlign: "center", marginBottom: "10px"}}>
                <Col xs="12">
                    {this.renderHeader()}
                </Col>
            </Row>
            <Row style={{textAlign: "center", justifyContent: "center"}}>
                {this.renderModal()}
            </Row>
            <Row> 
                <Col xs="12">
                    <Accordion activeKey={stringedMovementKeyCount}>
                        {this.renderAccordion()}
                    </Accordion>
                </Col>
            </Row>
        </Container> 
      </div>
    );
  }
}

function mapStateToProps( state ) {
    console.log('state in workout', state)
  return{
    workout: state,
    user: state.user
  } 
}

// export default connect(mapStateToProps, actions)(WorkoutTakeThree);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchWOD, fetchUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutTakeThree);

