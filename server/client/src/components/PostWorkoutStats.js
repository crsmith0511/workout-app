import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import _ from "lodash";
import { Container, Card, CardTitle, Row, Col} from 'reactstrap';
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import './wod.css';
import {
    Sparklines,
    SparklinesLine,
    SparklinesReferenceLine
  } from 'react-sparklines';


class PostWOD extends Component {
    constructor () {
        super()
         
        this.state = {
            data: {
                artist: '',
                title: ''
            }
        }

    }
    componentDidMount(){
        this.getSongs()
    }

    // getNowPlaying = () => {
    //     fetch('https://api.spotify.com/v1/me/player', {
    //         headers:{'Authorization': 'Bearer ' + this.state.token}
    //         }).then(response => response.json())
    //         .then((data) => {
    //             // console.log('player data ', data)
    //            this.setState({
    //                 nowPlaying: { 
    //                     nowPlayingTitle: data.item.name,
    //                     deviceId: data.device.id 
    //                     // albumArt: data.item.album.images[0].url
    //                   }
    //             });
    //         })
    // }

  getSongs(){
    fetch('https://api.spotify.com/v1/me/player/recently-played?limit=5&before=1586136960000', {
        headers:{'Accept': "application/json",'Authorization': 'Bearer BQDsNqpSZqezyVji5v0QerMFpNSpvaS9AXf3Sx87BpDNnF-NlbOszBqYxxCE8rHkco3MqHbrTfgKjgrLFKe6bdiALHkQmqjp5u8GPEPTnpjDhZDVKvoM41KO8_IRSOou2S9tuLqyOre6LVJNP5Mln5QrhflLu4rQMkz2YptG', "Content-Type": "application/json"}
        }).then(response => response.json())
        .then((data) => {
            console.log('recently played data ', data.items[0].track.artists[0].name)
    })

  }

  renderChart(){
    return(
        <Card style={{width: "100%", borderRight: "none", borderTop: "none"}}> 
        <CardTitle>
            <h1>Workout Zones</h1>
        </CardTitle>
            <Sparklines  data={[0, 15, 20, 15, 10, 20, 15, 10, 0, 10]}>
                <SparklinesLine color="black" />
                {/* <SparklinesReferenceLine type="avg" /> */}
            </Sparklines>
        </Card>
    )
  }

  renderRecentlyPlayed(){
    return(
            <ListGroup.Item>
            Songs Played During Your Workout
            </ListGroup.Item>
    )
  }

    
  render() {

    return (
      <Container>
        <Row> 
          <Col>
           {this.renderChart()}
          </Col>
        </Row>
        <Row>
          <Col>
          <ListGroup as="ul">
            <ListGroup.Item variant="primary">
            Songs Played During Your Workout
            </ListGroup.Item>
            {this.renderRecentlyPlayed()}
          </ListGroup>
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
export default connect(mapStateToProps, actions)(PostWOD);