import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import _ from "lodash";
import { Container, Card, CardTitle, Row, Col} from 'reactstrap';
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import './wod.css';
import Nav from './Nav'
import {Sparklines, SparklinesLine, SparklinesBars} from 'react-sparklines';


class PostWOD extends Component {
    constructor (props) {
        super(props)
         
        this.state = {
            songs: []
        }
        this.getSongs = this.getSongs.bind(this)
    }

    componentDidMount = () => {
      console.log('did mount state', this.state.songs)
        this.getSongs()
        this.renderChart()
    } 

  getSongs(){
    let date = new Date().getTime();
    console.log('date', date)
    let workoutTime = this.props.workout[0].time * 1000
    console.log("WT ", workoutTime)
    let timeSinceWODStarted = date - workoutTime
    console.log('tSWS: ', timeSinceWODStarted)

    //when you want a live time call the fetch Url would be:
    //https://api.spotify.com/v1/me/player/recently-played?after=timeSinceWODStarted
     fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers:{'Accept': "application/json",'Authorization': `Bearer ${this.props.user[0].accessToken}`, 
        "Content-Type": "application/json"}
        }).then(response => response.json())
        .then((data) => {
          console.log('get song', data.items)
          let playedSongs = []
          for(let i = 0; i < data.items.length; i++){
           
            let track = {
              title: data.items[i].track.name,
              artist: data.items[i].track.artists[0].name,
              albumnCover: data.items[i].track.album.images[1].url
            }
            playedSongs.push(track)
          }
           this.setState({songs: playedSongs})
    })
  }

  renderChart(){
    let rounds = this.props.workout[0].rounds
    let movements = this.props.workout[0].movements

    let dataList = [0]
    for(let j = 0; j < rounds; j++){
      for(let i = 0; i < movements.length; i++){
        if(movements[i].difficulty === 'Hard'){
          dataList.push(25)
        }
        if(movements[i].difficulty === 'Medium'){
          dataList.push(15)
        }
        if(movements[i].difficulty === 'Easy'){
            dataList.push(10)
        }
      }
    }
    console.log(dataList)
    return(
        <Card style={{width: "100%", borderRight: "none", borderTop: "none", background: "#e1e5f2"}}> 
        <CardTitle>
            <h1>Workout Intensity Pattern</h1>
        </CardTitle>
            <Sparklines data={dataList} svgHeight={120} svgWidth={500}> 
              <SparklinesBars style={{ stroke: "white", fill: "#22212e", fillOpacity: "0.25" }} />
              <SparklinesLine style={{ stroke: "#22212e", fill: "none" }} />
              {/* <SparklinesBars style={{ stroke: "white", fill: "#41c3f9", fillOpacity: ".25" }} /> */}
              {/* <SparklinesBars style={{ stroke: "#22212e", strokeWidth: "0"}} /> */}
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
        <Row style={{marginTop: "10px"}}>
          <Col>
          <ListGroup as="ul">
            <ListGroup.Item style={{textAlign: "center", color: "#22212e", background: "#c7d0ed"}}>
              <h4>Songs Played During Your Workout</h4>
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
  return{
    workout: state.workout,
	  user: state.user
  } 
}
export default connect(mapStateToProps, actions)(PostWOD);