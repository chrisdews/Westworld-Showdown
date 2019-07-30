import React from 'react';
import { Header } from 'semantic-ui-react'



class GameDisplay extends React.Component {

                 
  render() {
    return (
      <Header as='h3' block>
        {this.props.currentUser} has {this.props.cardCount} cards remaining
      </Header>
    )
  }
}



export default GameDisplay;
