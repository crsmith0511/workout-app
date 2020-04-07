import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import _ from "lodash";
import { Container, Card, CardTitle, Row, Col} from 'reactstrap';
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import './wod.css';
import Nav from './Nav'
import {
    Sparklines,
    SparklinesLine,
    SparklinesReferenceLine
  } from 'react-sparklines';


class PostWOD extends Component {
    constructor (props) {
        super(props)
         
        this.state = {
            songs: []
        }
        this.getSongs = this.getSongs.bind(this)
    }

    componentDidMount = () => {
        this.getSongs()
    } 

  getSongs(){
    console.log('state in get song',this.props.user, this.props.workout)
     fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers:{'Accept': "application/json",'Authorization': `Bearer ${this.props.user[0].accessToken}`, 
        "Content-Type": "application/json"}
        }).then(response => response.json())
        .then((data) => {
          let playedSongs = []
          for(let i = 0; i < data.items.length; i++){
           
            let track = {
              title: data.items[i].track.name,
              artist: data.items[i].track.artists[0].name,
              albumnCover: data.items[i].track.album.images[1].url
            }
            playedSongs.push(track)
            // this.setState({songs: playedSongs})
            // console.log(track)
          }
           this.setState({songs: playedSongs})
    })
  }

  // getWorkoutData = () =>{
  //   let rounds = this.props.workout[0].rounds
  //   let movements = this.props.workout[0].movements
  //   //eventually that 4 will be rounds
  //   let total = movements.length * 4
  //   console.log(total)
  //   let dataList = [0]
  //   for(let j = 0; j < total; j++){
  //     for(let i = 0; i < movements.length; i++){
  //       if(movements[i].difficulty === 'Hard'){
  //         dataList.push(25)
  //       }
  //       if(movements[i].difficulty === 'Medium'){
  //         dataList.push(15)
  //       }
  //       if(movements[i].difficulty === 'Easy'){
  //           dataList.push(5)
  //       }
  //     }
  //   }
  //   console.log(dataList)
  //    this.setState(prevState =>({
  //      data: prevState.data.concat(dataList)
  //     }))
  //    console.log(this.state.data)
  // }

  renderChart(){
    let rounds = this.props.workout[0].rounds
    let movements = this.props.workout[0].movements
    //eventually that 4 will be rounds
    let total = movements.length * 4
    // console.log(total)
    let dataList = [0]
    for(let j = 0; j < total; j++){
      for(let i = 0; i < movements.length; i++){
        if(movements[i].difficulty === 'Hard'){
          dataList.push(25)
        }
        if(movements[i].difficulty === 'Medium'){
          dataList.push(15)
        }
        if(movements[i].difficulty === 'Easy'){
            dataList.push(5)
        }
      }
    }
    return(
        <Card style={{width: "100%", borderRight: "none", borderTop: "none", background: "#e1e5f2"}}> 
        <CardTitle>
            <h1>Workout Zones</h1>
        </CardTitle>
            <Sparklines data={dataList}>
                <SparklinesLine color="#080f47" />
            </Sparklines>
        </Card>
    )
  }

  renderRecentlyPlayed(){
    const {songs} = this.state
    console.log('tracks in render playlist', songs)
    return _.map(songs, song => {
        return(
          <ListGroup.Item style={{background: "#e1e5f2"}}>
            <Row style={{alignItems: 'center'}}>
              <Col xsm="1" sytle={{textAlign: "left", marginLeft: "5px"}}>
                <img src={song.albumnCover} style={{ height: 150 }}/>
              </Col>
              <Col xsm="10" sytle={{textAlign: "right", alignItems: "center"}}>
                <h4 style={{fontWeight: "bold", color: "#080f47"}}>{song.title}</h4>
                <h4 style={{color: "#808080"}}>{song.artist}</h4>
              </Col>
            </Row>
          </ListGroup.Item>
        )
    }); 
  }

    
  render() {

    return (
      <div className="background">
      <Nav />
      <Container>
        <Row> 
          <Col>
           {this.renderChart()}
          </Col>
        </Row>
        <Row>
          <Col>
          <ListGroup as="ul">
            <ListGroup.Item style={{textAlign: "center", color: "#22212e", background: "#c7d0ed"}}>
            Songs Played During Your Workout
            </ListGroup.Item>
            {this.renderRecentlyPlayed()}
          </ListGroup>
          </Col>
        </Row>
      </Container> 
      </div>
    );
  }
}

function mapStateToProps( state ) {
  console.log('state from post', state)
  return{
    workout: state.workout,
	  user: state.user
  } 
}
export default connect(mapStateToProps, actions)(PostWOD);