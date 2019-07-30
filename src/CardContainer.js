import React, { Component } from 'react';
import CharCard from './CharCard'

import OpponentCard from './OpponentCard'
import HandStatus from './HandStatus'
import { Grid, Divider, Button } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";
import API from './API'
//import { Redirect } from 'react-router-dom'

class CardContainer extends Component {

  // constructor(props) {
  //   super(props);
  //   console.log("Card Container Constructor Triggered")
  //   this.state = {
  //     currentUser: null
  //   }
  // }




  // handleClick = () => {
  //   console.log("User logged out!!")
  //   this.props.clearUserState()
  //   API.clearToken()
  // }


  render() {
    console.log("CardContainer has rendered")

    const allCards = this.props.allCards
    const { currentUser } = this.props

    return (
      
      <>
        {/* <Button
          as={NavLink}
          to='/'
          onClick={this.handleClick}
        >Log Out</Button> */}
        {/* <h2> {currentUser ? `Logged in as ${this.props.currentUser.username}` : null}</h2> */}
        <h2> {currentUser ? `Logged in as ${currentUser}` : null}</h2>

        
              <Grid columns={2} relaxed='very'>
                <Grid.Column>
                  <h1>Your Card:</h1>
                  <CharCard 
                    card={this.props.userCard} 
                    setCard={this.props.setUserCard} 
                  />
                  <HandStatus 
                    user={this.props.currentUser}
                    cardCount={this.props.userCardCount}
                  />
                  
                </Grid.Column>
                <Grid.Column>
                  <h1>Opponent Card:</h1>
                  <OpponentCard 
                    card={this.props.oppCard} 
                    showCardStats={this.props.showCardStats}
                  />
                  <HandStatus 
                    user="Computer"
                    cardCount={this.props.oppCardCount}
                  />
                  
                </Grid.Column>
              </Grid>
              <Divider vertical>vs</Divider>

              
      
      </>
    );
  }
}

export default CardContainer;
