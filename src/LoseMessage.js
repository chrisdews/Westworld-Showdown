import React from 'react';
import { Header } from 'semantic-ui-react'



class LoseMessage extends React.Component {

                 
  render() {
    return (
      <Header as='h3' block>
        {/* Unlucky, {this.props.currentUser}. You Lost! */}
       {this.props.timerState === 0 ? "Out of time! You Lost" : "You were defeated!"}
      </Header>
    )
  }
}



export default LoseMessage;
