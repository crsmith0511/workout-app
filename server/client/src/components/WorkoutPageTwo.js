// import React, { Component } from "react";
// import { connect } from "react-redux";
// import * as actions from '../actions';
// import _ from "lodash";
// import { Container, Row, Col } from 'reactstrap';
// import {Accordion, Card, Button, Modal} from 'react-bootstrap'
// import './wod.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faRss, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
// // import SpotifyWebApi from 'spotify-web-api-js';
// // const spotifyApi = new SpotifyWebApi();

// class WorkoutPageTwo extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             movementKeyCount: 1,
//             round: 1, 
//             show : false,
//             countDownTime: 10,
//             minutes: 0,
//             seconds: 0,
//             pausedTime: 0,
//             // movementTimer: 0,
//             token: 'BQC-rTr6pu8jNeYl_3Nxl94paaruL-ZwBaE09NzRH1S96kAM3uYP3q0IfxlmShetHn3q-XiA762VSCX35CpoF40BEsbB3PUqN5NwIPyiu0AA2TpscfzirdBpy28I1Rjt8XnDg9qwD0h84Ksa9_hxGZgJLzpCPms2TWsB2nmeSsjhKQ',
//             // loggedIn: '',
//             nowPlaying: {
//                 nowPlayingTitle: 'Currently Paused' , 
//                 deviceId: ''
//                 // albumArt: ""
//             }
//         };
//         this.changeAccordionMovement = this.changeAccordionMovement.bind(this)
//         this.pausedTimer = this.pausedTimer.bind(this)
//         this.timer = this.timer.bind(this)
//         this.handleShow = this.handleShow.bind(this)
//         this.handleClose = this.handleClose.bind(this)
//         this.countDown = this.countDown.bind(this)
//         this.stopCountDown = this.stopCountDown.bind(this)
//         // this.resetPausedTimer = this.resetPausedTimer.bind(this)
//         this.getNowPlaying = this.getNowPlaying.bind(this)
//     }

//     componentDidMount(){
//         this.handleShow()
//         this.countDown()
//         this.setState({movementTimer: this.props.workout.workout[0].movements[0].time})
//         this.setState({minutes: this.props.workout.workout[0].time / 60})
//     }

//     countDown = () => {
//         this.myCountDownInterval = setInterval(() => {
//             if(this.state.countDownTime > 0){
//                 this.setState({
//                     countDownTime: this.state.countDownTime -1
//                 })
//             }else{
//                 this.timer()
//                 this.changeAccordionMovement()
//                 this.handleClose()
//                 this.playMusic() 
//                 this.stopCountDown()
//             }
//         }, 1000)
//     }

//     stopCountDown = () => {
//         clearInterval(this.myCountDownInterval)
//         this.setState({countDownTime: 10})
//         // this.resetPausedTimer()
//     }

//     pausedTimer = () => {
//         console.log('pausedClicked')
//         this.myPausedTimer = setInterval(() => {
//             console.log("PT: ", this.state.pausedTime)
//             this.setState({
//                 pausedTime: this.state.pausedTime +1
//             })
//         }, 1000)
//     }
    
//     // resetPausedTimer = () => {
        
//     //     this.setState({pausedTime: 0})
//     //     setTimeout (() =>{
//     //        this.changeAccordionMovement()
//     //     }, this.state.pausedTimer)
//     // }

//     stopPausedTimer = () =>{
//         clearInterval(this.myPausedTimer)
//     }

//     changeAccordionMovement = () => {
//     console.log('clicked change accordionMovement')
//     let movementTime = this.props.workout.workout[0].movements[this.state.movementKeyCount -1].time 
//     let timePaused = this.state.pausedTime
//     console.log('time paused', timePaused)
//     let accordionTime = movementTime - timePaused
//     console.log('Accord time before ', accordionTime)
//     // this.resetPausedTimer()
//         this.myInterval = setInterval(() => {
//             if(this.state.movementKeyCount < this.props.workout.workout[0].movements.length){
//               this.setState(prevState => ({
//                 movementKeyCount: prevState.movementKeyCount +1
//               }))
//             }else{
//                 if(this.state.round < this.props.workout.workout[0].rounds){          
//                     this.setState(prevState => ({
//                         movementKeyCount: 1,
//                         round: prevState.round +1
//                     }))
//                 }else{ 
//                     this.setState({
//                         movementKeyCount: 1,
//                         round: "DONE"
//                     })
//                     this.wodIsCompleted()
//                 }
//             }
//         }, accordionTime * 999.9)
//     }

//     timer = () => {
//         this.timerInterval = setInterval(() => {
//             const { seconds, minutes } = this.state
//             if (seconds > 0) {
//                 this.setState(({ seconds }) => ({
//                     seconds: seconds - 1
//                 }))
//             }
//             if (seconds === 0) {
//                 if (minutes === 0) {
//                     this.stopTimer()
//                 } else {
//                     this.setState(({ minutes }) => ({
//                         minutes: minutes - 1,
//                         seconds: 59
//                     }))
//                 }
//             } 
//         }, 1000)
//     }

//     wodIsCompleted = () => {
//         clearInterval(this.myInterval)
//     }
//     stopTimer = () => {
//         clearInterval(this.timerInterval)
//     }

//     resume = () =>{
//         this.handleShow()
//         this.countDown()
//         this.stopPausedTimer()
//     }

//     pause = () => {
//         this.wodIsCompleted()
//         this.stopTimer()
//         this.pausedTimer()
//         this.pauseMusic()
//     }

//     handleClose = () => {
//         this.setState({show: false});
//     }

//     handleShow = () => {
//         this.setState({show: true})
//     } 


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

//     //  "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQA1af2HbmkKjjXqPzIobnyAghU7U3poYxOCI4LtYZ7oF_Bk3Ub6EwxFBAhTpSXYVNhjlFSNGfAoexZN7LKVMDLGBgsiDMTq8g5IOJLJ0_6zbTgxzqA_eWiVge5lbbyiTugv7xef55eSAdCkYgojrTbIf3bGtp-ZgBxi5w"

//     playMusic = () =>{

//         fetch("https://api.spotify.com/v1/me/player/play?device_id=46774e015437f413e0c92f34d8b3d30b2334ea74", {
//             method: "PUT",
//             // body: {
//             //     "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
//             //     "offset": {
//             //       "position": 5
//             //     },
//             //     "position_ms": 0
//             //   },
//             headers: {
//                 "Accept": "application/json",
//                 "Authorization": "Bearer " + this.state.token ,
//                 "Content-Type": "application/json"
//             }
//         })
//     }

//     pauseMusic = () =>{

//         fetch('https://api.spotify.com/v1/me/player/pause', {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + this.state.token 
//             }
//         })
//     }

//     renderHeader(){
//         const { minutes, seconds } = this.state
//         if(this.props.workout.workout.length === 0){
//             return(
//                 <div></div>
//             )
//         }
//         return(
//             <Card style={{width: "100%"}}>
//             <Card.Header as="h5" >
//                 <Row>
//                     <Col xs="3" style={{textAlign: "left"}}>
//                         <h4> { minutes === 0 && seconds === 0? <h1>Busted!</h1>: <h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>}</h4>
//                     </Col>
//                     <Col xs="6" style={{textAlign: "center"}}>
//                         <FontAwesomeIcon style={{marginLeft: "5px", marginRight: "15px", marginTop: "10px"}} onClick={this.resume} icon={faPlay }/> 
//                         <FontAwesomeIcon style={{marginLeft: "10px", marginRight: "10px", marginTop: "10px"}} onClick={this.pause} icon={faPause} /> 
//                     </Col>
//                     <Col xs="3" style={{textAlign: "right", marginTop: "12px"}}>
//                         <h4>Round: {this.state.round}</h4>
//                     </Col>
//                 </Row>
//             </Card.Header>
//             <Card.Body style={{height: "3rem"}}>
//                 <Card.Title>
//                     <Row>
//                     <Col xs="2">
//                             <FontAwesomeIcon icon={faRss}/> 
//                         </Col>
//                         <Col xs="10">
//                             NOW PLAYING: {this.state.nowPlaying.nowPlayingTitle}
//                         </Col> 
//                     </Row>
//                 </Card.Title>
//             </Card.Body>
//         </Card>
//         )
//     }

//     renderList() {

//         if(this.props.workout.workout.length === 0){
//             return <div>Loading...</div>; 
//         }
//         // console.log('this is length', this.props.workout.workout[0].movements.length)
//         const movements = this.props.workout.workout[0].movements
//         // console.log('waiting for workout', movements)
//         return _.map(movements, movement => {
//             if(movement.movement === "Rest"){
//               return(
//                 <Card style={{width: "100%"}} key={movement._id}>
//                     <Accordion.Toggle as={Card.Header} eventKey={movement.index}>
//                         <Row>
//                             <Col xs="6">
//                                 <h5 style={{textAlign: "left"}}>{movement.movement}</h5>
//                             </Col>
//                             <Col xs="6">
//                                 <h5 style={{textAlign: "right"}}>Time: {movement.time}</h5>
//                             </Col>
//                         </Row>
//                     </Accordion.Toggle>
//                     <Accordion.Collapse eventKey={movement.index}>
//                     <Card.Body>
//                        <Card.Title>REST BREAK</Card.Title> 
//                     </Card.Body>
//                     </Accordion.Collapse>
//                 </Card>
//               )
//             }
//             return(
//                 <Card style={{width: "100%"}} key={movement._id}>
//                     <Accordion.Toggle as={Card.Header} eventKey={movement.index}>
//                         <Row>
//                             <Col xs="4">
//                                 <h5 style={{textAlign: "left"}}>{movement.movement}</h5>
//                             </Col>
//                             <Col xs="4">
//                                 <h5 style={{textAlign: "center"}}>Reps: {movement.reps}</h5>
//                             </Col>
//                             <Col xs="4">
//                                 <h5 style={{textAlign: "right"}}>Time: {movement.time}</h5>
//                             </Col>
//                         </Row>
//                     </Accordion.Toggle>
//                     <Accordion.Collapse eventKey={movement.index}>
//                     <Card.Body>
//                         <Row>
//                           <Col xs="12">
//                           <iframe width="250" height="200" src={movement.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
//                           </Col>
//                         </Row>

//                     </Card.Body>
//                     </Accordion.Collapse>
//                 </Card>
//             )
//         }); 
//     }


//   renderModal (){
//         if(this.state.show === true){
//             return (
//             <>
//             <Button style={{height:".05px", width: ".05px"}}  onClick={this.handleShow}>
//               Launch demo modal
//             </Button>
        
//             <Modal show={this.state.show} onHide={this.handleClose}>
//               <Modal.Header>
//                 <Modal.Title><h1 style={{textAlign: "center"}}>YOUR WORKOUT STARTS IN</h1></Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                  <h1 style={{textAlign: "center"}}>{this.state.countDownTime}</h1>
//               </Modal.Body>
//             </Modal>
//           </>
//         );
//         }else{
//             return (
//                 <div></div>
//             )
//         }
//   }
    
//   render() {
//       const {movementKeyCount} = this.state
//       const stringedMovementKeyCount = movementKeyCount.toString()
//     return (
//         <Container>
//         <Row style={{textAlign: "center", marginBottom: "10px"}}>
//           <Col xs="12">
//             {this.renderHeader()}
//           </Col>
//         </Row>
//        <Row> 
//          <Col xs="12">
//             <Accordion activeKey={stringedMovementKeyCount}>
//                 {this.renderList()}
//             </Accordion>
//          </Col>
//        </Row>
//        <Row>
//         {this.renderModal()}
//        </Row>
//         </Container> 

//     );
//   }
// }

// function mapStateToProps( state ) {
//     console.log('state in workout', state)
//   return{
//     workout: state,
//     user: state.user
//   } 
// }


// export default connect(mapStateToProps, actions)(WorkoutPageTwo);
