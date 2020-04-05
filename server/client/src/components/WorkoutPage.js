import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import _ from "lodash";
import { Container, Row, Col } from 'reactstrap';
import {Accordion, Card, Button, Modal} from 'react-bootstrap'
// import Timer from 'react-compound-timer'
import './wod.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

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
            token: '',
            loggedIn: '',
            nowPlaying: {
                nowPlayingTitle: 'Currently Paused' , 
                deviceId: ''
                // albumArt: ""
            }
        };
        // this.movementTracker = this.movementTracker.bind(this)
        this.timer = this.timer.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.countDown = this.countDown.bind(this)
        // this.getNowPlaying = this.getNowPlaying.bind(this)
    }

    async componentDidMount(){
        await this.setState({token: this.props.user[0].accessToken})
        // this.handleShow()
        // this.countDown()
        await this.setState({movementTimer: this.props.workout.workout[0].movements[0].time})
        await this.setState({minutes: this.props.workout.workout[0].time / 60})
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
        //    this.getNowPlaying()
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
        this.playMusic()
        // this.movementTracker()
    }

    pause = () => {
        console.log("pause clicked")
        console.log('pause state', this.state)
        // this.wodIsCompleted()
        this.stopTimer()
        this.pauseMusic()
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleShow = () => {
        this.setState({show: true})
    } 




//    getNowPlaying = () => {
//         fetch('https://api.spotify.com/v1/me/player', {
//             headers:{'Authorization': 'Bearer ' + this.state.token}
//             }).then(response => response.json())
//             .then((data) => {
//                 // console.log('player data ', data)
//                this.setState({
//                     nowPlaying: { 
//                         nowPlayingTitle: data.item.name,
//                         deviceId: data.device.id 
//                         // albumArt: data.item.album.images[0].url
//                       }
//                 });
//             })
//     }

    //  "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQA1af2HbmkKjjXqPzIobnyAghU7U3poYxOCI4LtYZ7oF_Bk3Ub6EwxFBAhTpSXYVNhjlFSNGfAoexZN7LKVMDLGBgsiDMTq8g5IOJLJ0_6zbTgxzqA_eWiVge5lbbyiTugv7xef55eSAdCkYgojrTbIf3bGtp-ZgBxi5w"

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
                "Authorization": "Bearer BQAmkydnsrosUNVR-7DB0o8XkHv0zzFZO2ohSrYzN1nogNr7oXTNqlwTuvWnRqmU8wexaBsK5vYRvMnzlJmGLH9rSvlcREP_iMCDJ0HKDh7Jvs7FxpkKrDfbqjD_nCNY3_leZ2K9-WEUScB0HTEg_Pl6aBBQetpLt2TwGUTPdKoPgQ",
                "Content-Type": "application/json"
            }
        })
    }

    pauseMusic = () =>{

        fetch('https://api.spotify.com/v1/me/player/pause', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer BQAmkydnsrosUNVR-7DB0o8XkHv0zzFZO2ohSrYzN1nogNr7oXTNqlwTuvWnRqmU8wexaBsK5vYRvMnzlJmGLH9rSvlcREP_iMCDJ0HKDh7Jvs7FxpkKrDfbqjD_nCNY3_leZ2K9-WEUScB0HTEg_Pl6aBBQetpLt2TwGUTPdKoPgQ",
            }
        })
    }




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
                            NOW PLAYING: {this.state.nowPlaying.nowPlayingTitle}
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
    console.log('state in workout', state)
  return{
    workout: state,
    user: state.user
  } 
}


export default connect(mapStateToProps, actions)(WorkoutPage);
