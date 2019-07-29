import React, { Component } from 'react';
import CharCard from './CharCard'
import OpponentCard from './OpponentCard'
import HandStatus from './HandStatus'
import { Grid, Divider } from 'semantic-ui-react'

class CardContainer extends Component {

    
    
    
    render() {
        return (
            <>
              <Grid columns={2} relaxed='very'>
                <Grid.Column>
                  <h1>Your Card:</h1>
                  <CharCard 
                    card={this.props.userCard} 
                    setCard={this.props.setUserCard} 
                  />
                  <HandStatus 
                    user={this.props.currentUser}
                    cardCount={this.props.userCardCount}
                  />
                  
                </Grid.Column>
                <Grid.Column>
                  <h1>Opponent Card:</h1>
                  <OpponentCard 
                    card={this.props.oppCard} 
                  />
                  <HandStatus 
                    user="Computer"
                    cardCount={this.props.oppCardCount}
                  />
                  
                </Grid.Column>
              </Grid>
              <Divider vertical>vs</Divider>

              
            </>
        );
    }
}

export default CardContainer;
