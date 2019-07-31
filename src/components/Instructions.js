import React from 'react';
import { Container, Header } from 'semantic-ui-react'

const Instructions = () => {
  return (
    <div>
        <Container text>
          <br></br>
    <Header as='h2'>Instructions</Header>
    <p className='instructions'>
     Welcome to WestWorld Showdown! The aim of the game is to to take all of your opponents cards as fast as possible! Click the attribute on your card that you think will be higher than your opponents card - if you're correct, you take their card. 
    </p>
    
    <p className='instructions'>
    Collecting all cards before the timer is up means more points! If the timer runs out...you Lose! Good luck!
    </p>
  </Container>
    </div>
  );
};

export default Instructions;