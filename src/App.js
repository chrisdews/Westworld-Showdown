import React from 'react';
import logo from './logo.svg';
import './App.css';
import CardContainer from './CardContainer'
// import API from './API.js'

class App extends React.Component {

  state = {
    currentUser: '',
    cards: [],
    userCard: undefined,
    oppCard: undefined
  }


  componentDidMount(){
    // API.cards()
    // .then(data => console.log(data))   

    const cardsURL = 'http://localhost:3000/api/v1/cards'
    fetch(cardsURL).then(resp => resp.json()).then(data => this.setState({cards: data}))
  }

  setUserCard = () => {
    console.log('hi from set user')
  }

  setOppCard = () => {
    console.log('hi from set opp')
  }



  render(){

    const allCards = this.state.cards
    const userCard = this.state.userCard
    const oppCard = this.state.oppCard
    return (
      <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          
          <CardContainer 
            allCards={allCards} 
            userCard={userCard} 
            oppCard={oppCard} 
            setUserCard={this.setUserCard} 
            setOppCard={this.setOppCard}
          />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      </>
    );
  }
}

export default App;
