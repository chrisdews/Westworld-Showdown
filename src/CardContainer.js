import React, { Component } from 'react';
import CharCard from './CharCard'
import { Grid, Divider, Button } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";
import API from './API'
//import { Redirect } from 'react-router-dom'


class CardContainer extends Component {

  constructor(props) {
    super(props);
    console.log("Card Container Constructor Triggered")
    this.state = {
      currentUser: null
    }
  }


componentDidMount(){
  if (!localStorage.token) {
    console.log("No Current User...redirecting back to welcome page")
        this.props.history.push('/')
  }
}

  handleClick = () => {
    console.log("User logged out!!")
    this.props.clearUserState()
    API.clearToken()
  }


  render() {
    console.log("CardContainer has rendered")

    const allCards = this.props.allCards
    const { currentUser } = this.props

    return (
      <>
        <Button
          as={NavLink}
          to='/'
          onClick={this.handleClick}
        >Log Out</Button>
        {/* <h2> {currentUser ? `Logged in as ${this.props.currentUser.username}` : null}</h2> */}
        <h2> {currentUser ? `Logged in as ${currentUser.username}` : null}</h2>

        <Grid columns={2} relaxed='very'>
          {
            allCards.map((card, i) => <Grid.Column key={i}><CharCard card={card} /></Grid.Column>)
          }
        </Grid>

        <Divider vertical>vs</Divider>
      </>
    );
  }
}

export default CardContainer;
