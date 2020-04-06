import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import _ from "lodash";
import { Container, Row, Col } from 'reactstrap';
import {Accordion, Card, Button, Modal} from 'react-bootstrap'
import './wod.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
// import SpotifyWebApi from 'spotify-web-api-js';
// const spotifyApi = new SpotifyWebApi();

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
            token: 'BQC-rTr6pu8jNeYl_3Nxl94paaruL-ZwBaE09NzRH1S96kAM3uYP3q0IfxlmShetHn3q-XiA762VSCX35CpoF40BEsbB3PUqN5NwIPyiu0AA2TpscfzirdBpy28I1Rjt8XnDg9qwD0h84Ksa9_hxGZgJLzpCPms2TWsB2nmeSsjhKQ',
            nowPlaying: {
                nowPlayingTitle: 'Currently Paused' , 
                deviceId: ''
                // albumArt: ""
            }
        };
        this.changeAccordionMovement = this.changeAccordionMovement.bind(this)
        this.timer = this.timer.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.countDown = this.countDown.bind(this)
        this.stopCountDown = this.stopCountDown.bind(this)
        this.indexCounter = this.indexCounter.bind(this)
        this.getNowPlaying = this.getNowPlaying.bind(this)
    }

    componentDidMount(){
        this.handleShow()
        this.countDown()
        this.setState({movementTimer: this.props.workout.workout[0].movements[0].time})
    }

    countDown = () => {
        this.myCountDownInterval = setInterval(() => {
            if(this.state.countDownTime > 0){
                this.setState({
                    countDownTime: this.state.countDownTime -1
                })
            }else{
                this.indexCounter()
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

    indexCounter = () => {
        const length = this.props.workout.workout[0].movements.length
        this.indexInterval = setInterval(() => {
            console.log('index from index counter', this.state.index)
            if(this.state.index === length){     
                this.setState({
                     index: 0
                })
            }else{
               this.setState(prevState => ({
                    index: prevState.index  +1
                }))
            }
        }, this.state.movementTimer * 800)
    }

    stopIndexCounter = () =>{
        clearInterval(this.indexInterval)
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
                    this.wodIsCompleted()
                }
            }
        }, this.state.movementTimer * 1001)
    }

    timer = () => {
        this.timerInterval = setInterval(() => {
            console.log('this time interval', this.state.index)
            if(this.state.movementTimer === 1){     
                this.setState({
                     movementTimer: this.props.workout.workout[0].movements[this.state.index].time
                })
                // this.setState({
                //       movementTimer: this.props.workout.workout[0].movements[this.state.movementKeyCount -1].time
                //   })
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

    wodIsCompleted = () => {
        clearInterval(this.myInterval)
    }
    stopTimer = () => {
        clearInterval(this.timerInterval)
    }

    resume = () =>{
        this.handleShow()
        this.countDown()
        this.stopPausedTimer()
        this.setState({running: true})
    }

    pause = () => {
        this.wodIsCompleted()
        this.stopTimer()
        this.pauseMusic()
        this.setState({running: false})
        this.stopIndexCounter()
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleShow = () => {
        this.setState({show: true})
    } 


   getNowPlaying = () => {
        fetch('https://api.spotify.com/v1/me/player', {
            headers:{'Authorization': 'Bearer BQAmJWHS9MHP6h73Vnnxo76mDh_380JLQPBxLqZeYv_OeCNvg0B6dVLNUgs2L-tcRLQX9byCYFQ_eN5Wua5LekifcMLuwNiQkR94MXoZ1qO78IGb40tbBTcyVnLtrbQE6UVX3Bv_b-PtUS_m9IAaVMl1nmmACbkAif63hZV6FEH_lA' }
            }).then(response => response.json())
            .then((data) => {
                // console.log('player data ', data)
               this.setState({
                    nowPlaying: { 
                        nowPlayingTitle: data.item.name,
                        deviceId: data.device.id 
                        // albumArt: data.item.album.images[0].url
                      }
                });
            })
    }

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
                "Authorization": "Bearer BQAmJWHS9MHP6h73Vnnxo76mDh_380JLQPBxLqZeYv_OeCNvg0B6dVLNUgs2L-tcRLQX9byCYFQ_eN5Wua5LekifcMLuwNiQkR94MXoZ1qO78IGb40tbBTcyVnLtrbQE6UVX3Bv_b-PtUS_m9IAaVMl1nmmACbkAif63hZV6FEH_lA" ,
                "Content-Type": "application/json"
            }
        })
    }

    pauseMusic = () =>{

        fetch('https://api.spotify.com/v1/me/player/pause', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer BQAmJWHS9MHP6h73Vnnxo76mDh_380JLQPBxLqZeYv_OeCNvg0B6dVLNUgs2L-tcRLQX9byCYFQ_eN5Wua5LekifcMLuwNiQkR94MXoZ1qO78IGb40tbBTcyVnLtrbQE6UVX3Bv_b-PtUS_m9IAaVMl1nmmACbkAif63hZV6FEH_lA"
            }
        })
    }

    renderPlayOrPause(){
        if(this.state.running === true){
            return(
                <FontAwesomeIcon style={{marginLeft: "10px", marginRight: "10px", marginTop: "10px"}} onClick={this.pause} icon={faPause} /> 
            )
        }
        if(this.state.running === false){
            return(
                <FontAwesomeIcon style={{marginLeft: "5px", marginRight: "15px", marginTop: "10px"}} onClick={this.resume} icon={faPlay }/>
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
            <Card.Header as="h5" >
                <Row>
                    <Col xs="3" style={{textAlign: "left"}}>
                        {/* <h4>:{this.state.movementTimer}</h4> */}
                        <h1>:{movementTimer < 10 ? `0${movementTimer}` : movementTimer}</h1>
                        {/* <h4> { minutes === 0 && seconds === 0? <h1>Busted!</h1>: <h1>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>}</h4> */}
                    </Col>
                    <Col xs="6" style={{textAlign: "center"}}>
                        {this.renderPlayOrPause()}
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
                 <h1 style={{textAlign: "center"}}>{this.state.countDownTime}</h1>
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
       <Row>
        {this.renderModal()}
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


export default connect(mapStateToProps, actions)(WorkoutTakeThree);
