import React from 'react';
import { Header } from 'semantic-ui-react'



class WinMessage extends React.Component {

                 
  render() {
    return (
      <Header as='h3' block>
        Congratulations {this.props.currentUser}! You Won!
      </Header>
    )
  }
}



export default WinMessage;
