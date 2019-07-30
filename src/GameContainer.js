import React, { Component } from 'react';
import './App.css';
import CardContainer from './CardContainer'
import GameDisplay from './GameDisplay'
import API from "./API.js";

const cardsURL = "http://localhost:3000/api/v1/cards";


class GameContainer extends Component {

  state ={
    currentUser: 'Chris',
    allCards: [],
    gameStatus: 'Let the battle commence...',
    userIndexCounter: 0,
    oppIndexCounter: 0,
    userAllCards: [],
    oppAllCards: [],
    gameStart: false,
  }

  componentDidMount(){
    fetch(cardsURL).then(resp => resp.json()).then(data => this.setState({allCards: data})) 
  }

  startGame = () => {
    this.setState({gameStart: true})
    const allCards = this.state.allCards
    const randNum = this.getRandomInt()
    const userCards = allCards.splice(randNum, allCards.length/2)
    this.setState({userAllCards: userCards, oppAllCards: allCards})
  }

  setUserCard = (attributeKey, attributeValue) => {
    console.log(attributeKey, attributeValue)
    let userCard = this.state.userAllCards[this.state.userIndexCounter]
    let oppCard = this.state.oppAllCards[this.state.oppIndexCounter]
    console.log(userCard)
    console.log(oppCard)  

    if (attributeValue > oppCard[attributeKey]){
      let winnerText = `${userCard.name} took down ${oppCard.name}! You took ownership of ${oppCard.name}`
      let oppAllCards = this.state.oppAllCards
      let newOppCards = oppAllCards.filter(card => card.id !== oppCard.id)
      this.setState({
        gameStatus: winnerText, 
        userAllCards: [...this.state.userAllCards, oppCard], 
        oppAllCards: newOppCards, 
        userIndexCounter: (this.state.userIndexCounter < this.state.userAllCards.length ? ++this.state.userIndexCounter : 0)
      })  
    } else {
      let loserText = `${userCard.name} was brutally disabled by ${oppCard.name}! Your opponent took ownership of ${userCard.name}`
      let oldUserAllCards = this.state.userAllCards
      let newUserCards = oldUserAllCards.filter(card => card.id !== userCard.id)
      this.setState({
        gameStatus: loserText, 
        oppAllCards: [...this.state.oppAllCards, userCard], 
        userAllCards: newUserCards, 
        oppIndexCounter: (this.state.oppIndexCounter < this.state.oppAllCards.length ? ++this.state.oppIndexCounter : 0)
      }) 
    }
  }

  getRandomInt = () => (Math.floor(Math.random()*Math.floor(8)))

  render() {
    const allCards = this.state.allCards
    let userCard = this.state.userAllCards[this.state.userIndexCounter]
    let oppCard = this.state.oppAllCards[this.state.oppIndexCounter]
    const currentUser = this.state.currentUser
    const gameStatus = this.state.gameStatus
    const userCardCount = this.state.userAllCards.length
    const oppCardCount = this.state.oppAllCards.length

    return (
      <div className="App">
        
        <GameDisplay 
          currentUser={currentUser}
          gameStatus={gameStatus}
        />
        {this.state.gameStart ? 
          <CardContainer
          // {...routerProps}
          clearUserState={this.props.clearUserState} 
          currentUser={currentUser}
          allCards={allCards} 
          userCard={userCard} 
          oppCard={oppCard}
          userCardCount={userCardCount}
          oppCardCount={oppCardCount}
          setUserCard={this.setUserCard} 
          setOppCard={this.setOppCard}
        /> : <button onClick={this.startGame}>Start the game!</button>}
      </div>
    );
  }
}

export default GameContainer;
