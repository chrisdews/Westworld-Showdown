import React, { Component } from 'react';
import './App.css';
import CardContainer from './CardContainer'
import GameDisplay from './GameDisplay'
import WinMessage from './WinMessage'
import LoseMessage from './LoseMessage'
import { NavLink } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import API from "./API.js";

class GameContainer extends Component {
  state ={
    // currentUser: 'Chris',
    allCards: [],
    gameStatus: 'Let the battle commence...',
    userIndexCounter: 0,
    oppIndexCounter: 0,
    userAllCards: [],
    oppAllCards: [],
    showCardStats: false,
    gameStart: false,
    userWon: false,
    oppWon: false,
  }

  componentDidMount(){
    if (!localStorage.token) {
      console.log("No Current User...redirecting back to welcome page")
          this.props.history.push('/')
          return null
    }
    this.getCards()
  }


  getCards = () => {
    API.cards().then(cards => this.setState({allCards: cards}))
  }

  startGame = () => {
    const allCards = this.state.allCards
    let newCards = this.shuffleArray(allCards)
    const userCards = newCards.slice(allCards.length/2, allCards.length)
    const oppCards = newCards.slice(0, allCards.length/2)
    this.setState({
      userIndexCounter: 0,
      oppIndexCounter: 0,
      gameStart: true,
      userWon: false,
      oppWon: false,
      showCardStats: false,
      userAllCards: userCards,
      oppAllCards: oppCards
      
    })
  }

  shuffleArray = (allCards) => {
    let currentIndex = allCards.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = allCards[currentIndex];
    allCards[currentIndex] = allCards[randomIndex];
    allCards[randomIndex] = temporaryValue;
    }
    return allCards;
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

    this.setState({showCardStats: true})
    // shows opponent card attributes

    const winMatchUp = () => {
      let winnerText = `${userCard.name} took down ${oppCard.name}! You took ownership of ${oppCard.name}`
      let oppAllCards = this.state.oppAllCards
      let continueGameOppCards = oppAllCards.filter(card => card.id !== oppCard.id)

      continueGameOppCards.length === 0 ? this.setState({userWon: true}) : console.log('carry on')
      // checking for empty array, if empty userWon = true and cards no longer render

      this.setState({
        gameStatus: winnerText, 
        userAllCards: [...this.state.userAllCards, oppCard], 
        oppAllCards: continueGameOppCards,
        showCardStats: false,
        userIndexCounter: (this.state.userIndexCounter < this.state.userAllCards.length ? ++this.state.userIndexCounter : 0),

      }) 
    }  
    

    const loseMatchUp = () => {
      let loserText = `${userCard.name} was brutally disabled by ${oppCard.name}! Your opponent took ownership of ${userCard.name}`
      let oldUserAllCards = this.state.userAllCards
      let newUserCards = oldUserAllCards.filter(card => card.id !== userCard.id)
      newUserCards.length === 0 ? this.setState({oppWon: true}) : console.log('carry on') 
      // checking for empty array, if empty oppWon = true and cards no longer render
      this.setState({
        gameStatus: loserText, 
        oppAllCards: [...this.state.oppAllCards, userCard], 
        userAllCards: newUserCards, 
        showCardStats: false,
        oppIndexCounter: (this.state.oppIndexCounter < this.state.oppAllCards.length ? ++this.state.oppIndexCounter : 0),
      }) 
    }  

    (attributeValue > oppCard[attributeKey]) ? setTimeout(winMatchUp, 3000) : setTimeout(loseMatchUp, 3000)
    // if chosen attibute is greater than opponent card attribute run Win, else run Lose
  }

  handleClick = () => {
    console.log("User logged out!!")
    this.props.clearUserState()
    API.clearToken()
  }

  render() {
    const allCards = this.state.allCards
    let userCard = this.state.userAllCards[this.state.userIndexCounter]
    let oppCard = this.state.oppAllCards[this.state.oppIndexCounter]
    const currentUser = this.props.currentUser
    const gameStatus = this.state.gameStatus
    const userCardCount = this.state.userAllCards.length
    const oppCardCount = this.state.oppAllCards.length
    const showCardStats = this.state.showCardStats

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

        <Button
          as={NavLink}
          to='/'
          onClick={this.handleClick}
        >Log Out</Button>
        <Button
          as={NavLink}
          to='/scores'
        >See High Scores!</Button>

        
        {this.state.gameStart && !this.state.oppWon && !this.state.userWon ? 
         <>
          <GameDisplay 
          currentUser={currentUser}
          gameStatus={gameStatus}
          />

          <CardContainer
          // {...routerProps}
          clearUserState={this.props.clearUserState} 
          currentUser={this.props.currentUser}
          allCards={allCards} 
          userCard={userCard} 
          oppCard={oppCard}
          userCardCount={userCardCount}
          oppCardCount={oppCardCount}
          setUserCard={this.setUserCard} 
          setOppCard={this.setOppCard}
          showCardStats={showCardStats}
          
          
        />
        </>
        : <Button onClick={this.startGame}>Start the game!</Button>}

        
        
      </div>
    );
  }
}

export default GameContainer;
