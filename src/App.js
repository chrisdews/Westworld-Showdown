import React from 'react';
import './App.css';
import CardContainer from './CardContainer'
import GameDisplay from './GameDisplay'
// import API from './API.js'

class App extends React.Component {

  state = {
    currentUser: 'Chris',
    allCards: [],
    gameStatus: 'Let the battle commence...',
    arrayIndexCounter: 0,
    userAllCards: undefined,
    oppAllCards: undefined,
    userCard: undefined,
    oppCard: undefined
    
  }


  componentDidMount(){
    // API.cards()
    // .then(data => console.log(data))   

    const cardsURL = 'http://localhost:3000/api/v1/cards'
    fetch(cardsURL).then(resp => resp.json()).then(data => this.setState({allCards: data})) 
  }

  randomiseAndSplitAllCards = () => {
    console.log('array randomised!')
    console.log(this.state.allCards)
  }

  setUserCard = (attributeKey, attributeValue) => {
    console.log(attributeKey, attributeValue)
    // const att = attributeKey    
    if (attributeValue > this.state.oppCard[attributeKey]){
      const winnerText = `${this.state.userCard.name} took down ${this.state.oppCard.name}! You took ownership of ${this.state.oppCard.name}`
      this.setState({gameStatus: winnerText})
      this.setState({userAllCards: [...this.state.userAllCards, this.state.oppCard]})
      const takenCard = this.state.oppCard
      const oppAllCards = this.state.oppAllCards
      const newOppCards = oppAllCards.filter(card => card.id !== takenCard.id)
      this.setState({oppAllCards: newOppCards})
    } else {
      const loserText = `${this.state.userCard.name} was brutally disabled by ${this.state.oppCard.name}! Your opponent took ownership of ${this.state.userCard.name}`
      this.setState({gameStatus: loserText})
      this.setState({oppAllCards: [...this.state.oppAllCards, this.state.userCard]})
      const takenCard = this.state.userCard
      const userAllCards = this.state.userAllCards
      const newUserCards = userAllCards.filter(card => card.id !== takenCard.id)
      this.setState({userAllCards: newUserCards})
    }
  }



  // setOppCard = () => {
  //   console.log('hi from set opp')
  // }



  render(){

    const allCards = this.state.allCards
    const userCard = this.state.userCard
    const oppCard = this.state.oppCard
    const currentUser = this.state.currentUser
    const gameStatus = this.state.gameStatus
    const userCardCount = this.state.userAllCards.length
    const oppCardCount = this.state.oppAllCards.length

    return (
      <>
      <div className="App">
        <header className="App-header">
          
          <GameDisplay 
            currentUser={currentUser}
            gameStatus={gameStatus}
          />
          <CardContainer 
            allCards={allCards} 
            userCard={userCard} 
            oppCard={oppCard}
            userCardCount={userCardCount}
            oppCardCount={oppCardCount}
            currentUser={currentUser} 
            setUserCard={this.setUserCard} 
            setOppCard={this.setOppCard}
          />
          
        </header>
      </div>
      </>
    );
  }
}

export default App;
