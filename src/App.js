
import React from 'react';
import './App.css';
import CardContainer from './CardContainer'
import GameDisplay from './GameDisplay'
import API from "./API.js";


import { Route, Switch } from "react-router-dom";
import WelcomePage from "./WelcomePage";
const cardsURL = "http://localhost:3000/api/v1/cards";

class App extends React.Component {
  state = {

    currentUser: 'Chris',
    allCards: [],
    gameStatus: 'Let the battle commence...',
    userIndexCounter: 0,
    oppIndexCounter: 0,
    userAllCards: [],
    oppAllCards: [],
    gameStart: false,
    
//     cards: [],
    username: "",
    password: "",
    user: null
    
  }


  componentDidMount(){
    // API.cards()
    // .then(data => console.log(data))   

    // const cardsURL = 'http://localhost:3000/api/v1/cards'
    fetch(cardsURL).then(resp => resp.json()).then(data => this.setState({allCards: data})) 
    
    console.log("App has mounted")
//     this.fetchCards()
    this.setCurrentUserFromToken()
  }

  setUserCard = (attributeKey, attributeValue) => {
    console.log(attributeKey, attributeValue)
    // const att = attributeKey  
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

  startGame = () => {
    this.setState({gameStart: true})
    const allCards = this.state.allCards
    const randNum = this.getRandomInt()
    const userCards = allCards.splice(randNum, allCards.length/2)
    // const userCard = userCards[this.state.userIndexCounter]
    // const oppCard = allCards[this.state.oppIndexCounter]
    this.setState({userAllCards: userCards, oppAllCards: allCards})
  }



  // setOppCard = () => {
  //   console.log('hi from set opp')
  // }



  
   
    
 

  clearUserState = () => {
    this.setState({
      username: "",
      password: "",
      user: null
    })
  }

  setCurrentUserFromToken = () => {
    let token = localStorage.token ? localStorage.token : null

    if (token){
      API.validateUser().then(user => {
        this.setState({user})
      })  
    }
  }

  handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  createUserOrSignIn = (showLogIn) => {

    console.log(showLogIn ? "Logging in..." : "Signing up...")
    let user = { username: this.state.username, password: this.state.password }
    if (showLogIn) {
      this.logIn(user)
    }
    else {
      this.createUser(user)
    }
  }

  createUser = user => {
    API.signUp(user).then(userData => this.setState({ user: userData }))
      .then(() => {
        console.log(this.props.history)
        this.props.history.push('/game')})
      .catch(errors => {
        this.setState({ errors })
        alert(errors)
      })
  }

  logIn = user => {
    API.logIn(user).then(userData => this.setState({ user: userData }))
      .then(() => this.props.history.push('/game'))
      .catch(errors => {
        this.setState({ errors })
        alert(errors)
      })
  };

//   fetchCards = () => {
//     fetch(cardsURL)
//     .then(resp => resp.json())
//     .then(data => this.setState({ cards: data }, console.log("Cards fetched", data)));
//   }



  renderWelcomeOrWelcomeBack = (routerProps) => {
    if (!localStorage.token){
    return(
      <WelcomePage {...routerProps}
      handleFormChange={this.handleFormChange}
      username={this.state.username}
      password={this.state.password}
      createUserOrSignIn={this.createUserOrSignIn}
    />
    )
    }
    else {
      return <h1>HELLO</h1>
    }
  }

  render() {
    console.log("APP HAS RENDERED")
    
    
    const allCards = this.state.allCards
    let userCard = this.state.userAllCards[this.state.userIndexCounter]
    let oppCard = this.state.oppAllCards[this.state.oppIndexCounter]
    const currentUser = this.state.currentUser
    const gameStatus = this.state.gameStatus
    const userCardCount = this.state.userAllCards.length
    const oppCardCount = this.state.oppAllCards.length

//     const allCards = this.state.cards;

    return (
      <div className="App">
        {this.state.errors}
        <header className="App-header">

          
          <GameDisplay 
            currentUser={currentUser}
            gameStatus={gameStatus}
          />
          {/* {this.state.gameStart ? <CardContainer 
            allCards={allCards} 
            userCard={userCard} 
            oppCard={oppCard}
            userCardCount={userCardCount}
            oppCardCount={oppCardCount}
            currentUser={currentUser} 
            setUserCard={this.setUserCard} 
            setOppCard={this.setOppCard}
          /> : <button onClick={this.startGame}>Start the game!</button>} */}
          


          <React.Fragment>
            <Switch>
              <Route exact path="/test" render={() => <h1>Home!</h1>} />

              <Route exact path='/' render={routerProps =>
               {return this.renderWelcomeOrWelcomeBack(routerProps)}
              }
              />

              <Route exact path='/game' render={routerProps =>


                        (this.state.gameStart ? <CardContainer
                          {...routerProps}
                          currentUser={this.state.user}
                          clearUserState={this.clearUserState} 
                          allCards={allCards} 
                          userCard={userCard} 
                          oppCard={oppCard}
                          userCardCount={userCardCount}
                          oppCardCount={oppCardCount}
                          // currentUser={currentUser} 
                          setUserCard={this.setUserCard} 
                          setOppCard={this.setOppCard}
                        /> : <button onClick={this.startGame}>Start the game!</button>)
              }
              />


            </Switch>
          </React.Fragment>



        </header>
      </div>
    );
  }
}
export default App;






                /* /* <CardContainer {...routerProps}
                  // allCards={allCards}
                  currentUser={this.state.user}
                  clearUserState={this.clearUserState}
                />} /> */