import React, { Component } from 'react';
import './App.css';
import CardContainer from './CardContainer'
import GameDisplay from './GameDisplay'
import WinMessage from './WinMessage'
import LoseMessage from './LoseMessage'
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
    // usersTurn: true,
    userWon: false,
    oppWon: false
  }

  componentDidMount(){
    fetch(cardsURL).then(resp => resp.json()).then(data => this.setState({allCards: data})) 
  }

  startGame = () => {
    this.setState({
      gameStart: true,
      userWon: false,
      oppWon: false
    })
    const allCards = this.state.allCards
    const randNum = this.getRandomInt()
    const userCards = allCards.splice(randNum, allCards.length/2)
    this.setState({userAllCards: userCards, oppAllCards: allCards})
  }

  setUserCard = (attributeKey, attributeValue) => {
    let userCardsLength = this.state.userAllCards.length -1
    let oppCardsLength = this.state.oppAllCards.length -1
    this.state.userIndexCounter < userCardsLength ? console.log(userCardsLength) : this.setState({userIndexCounter: 0})
    this.state.oppIndexCounter < oppCardsLength ? console.log(oppCardsLength) : this.setState({oppIndexCounter: 0})
    // check if indexCounter is < array.length, reset indexcounter in state if true.
  
    let userCard = this.state.userAllCards[this.state.userIndexCounter]
    let oppCard = this.state.oppAllCards[this.state.oppIndexCounter]
    // assign current visible cards based on index counter

    const winMatchUp = () => {
      let winnerText = `${userCard.name} took down ${oppCard.name}! You took ownership of ${oppCard.name}`
      let oppAllCards = this.state.oppAllCards
      let newOppCards = oppAllCards.filter(card => card.id !== oppCard.id)
      newOppCards.length === 0 ? this.setState({userWon: true}) : console.log('carry on')

      this.setState({
        gameStatus: winnerText, 
        userAllCards: [...this.state.userAllCards, oppCard], 
        oppAllCards: newOppCards, 
        userIndexCounter: (this.state.userIndexCounter < this.state.userAllCards.length ? ++this.state.userIndexCounter : 0)
      })  
      this.state.userAllCards.length > 0 || this.state.oppAllCards.length > 0 ? this.setState({gameOver: false}) : this.setState({gameOver: true})
      // checking for empty arrays, both must have length > 0 else gameOver = true
    }

    const loseMatchUp = () => {
      let loserText = `${userCard.name} was brutally disabled by ${oppCard.name}! Your opponent took ownership of ${userCard.name}`
      let oldUserAllCards = this.state.userAllCards
      let newUserCards = oldUserAllCards.filter(card => card.id !== userCard.id)
      newUserCards.length === 0 ? this.setState({oppWon: true}) : console.log('carry on')
      // checking for empty array, if true gameOver = true
      // need to do this for oppcards too...

      this.setState({
        gameStatus: loserText, 
        oppAllCards: [...this.state.oppAllCards, userCard], 
        userAllCards: newUserCards, 
        oppIndexCounter: (this.state.oppIndexCounter < this.state.oppAllCards.length ? ++this.state.oppIndexCounter : 0),
      }) 
      

    }
    
    (attributeValue > oppCard[attributeKey]) ? winMatchUp() : loseMatchUp()
    // if chosen attibute is greater than opponent card attribute run Win, else run Lose

    
    
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

        {this.state.userWon ? 
        <WinMessage 
          currentUser={currentUser}
        /> : null}
        {this.state.oppWon ? 
        <LoseMessage 
          currentUser={currentUser}
        /> : null}
        
        {this.state.gameStart && !this.state.oppWon && !this.state.userWon ? 
         <>
          <GameDisplay 
          currentUser={currentUser}
          gameStatus={gameStatus}
          />

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
        />
        </>
        : <button onClick={this.startGame}>Start the game!</button>}

        
        
      </div>
    );
  }
}

export default GameContainer;
