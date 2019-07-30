import React, { Component } from 'react';
import API from '../API'
import { Header, Image, Table, Button } from 'semantic-ui-react'
import ScoreCard from '../components/ScoreCard';
import { NavLink } from "react-router-dom";



class HighScoreContainer extends Component {

  // state ={
  //   scores: {}
  // }

  changeScoresToArray = () => {
    let obj = this.props.scores
    return Object.entries(obj).map(([key, value]) => ({key,value}));

  }

  render() {
    //debugger
    return (
      <div>
      <Button
      as={NavLink}
      to='/game'
      onClick={this.handleClick}
    >Go Back</Button>

      <Table color={'white'} basic='very' celled collapsing inverted>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>UserName</Table.HeaderCell>
        <Table.HeaderCell>Total Score</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {this.changeScoresToArray().map((userScore,i) => <ScoreCard key={i} userScore={userScore}/>)}
      
    </Table.Body>
  </Table>
  </div>
    );
  }
}

export default HighScoreContainer;