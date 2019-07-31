import React from 'react';
import { Header } from 'semantic-ui-react'



class GameDisplay extends React.Component {


  render() {
    let divStyle
    if (this.props.gameStatus === "Let the battle commence..."){
      divStyle = {
        color: 'black',
      }
    }
    else if (this.props.winOrLose === "win") {
      divStyle = {
        color: 'green',
      }
    } else if (this.props.winOrLose === "lose") {
      divStyle = {
        color: 'red',
      }
    } 

    return (
      <Header style={divStyle} as='h3' block>
        {/* { this.props.winOrLose === "win" ? color='green' : null} */}
        {this.props.gameStatus}
      </Header>
    )
  }
}



export default GameDisplay;
