import React from 'react';
import { Header } from 'semantic-ui-react'



class LoseMessage extends React.Component {

                 
  render() {
    return (
      <Header as='h3' block>
        Unlucky, {this.props.currentUser}. You Lost!
      </Header>
    )
  }
}



export default LoseMessage;
