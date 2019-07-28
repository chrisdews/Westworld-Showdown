import React, { Component } from 'react';
import CharCard from './CharCard'
import { Grid, Divider } from 'semantic-ui-react'

class CardContainer extends Component {

    
    
    render() {

        const allCards = this.props.allCards
       
        return (
            <>
              <Grid columns={2} relaxed='very'>
                {
                    allCards.map((card,i) => <Grid.Column key={i}><CharCard card={card}/></Grid.Column>)
                }
              </Grid>

              <Divider vertical>vs</Divider>
            </>
        );
    }
}

export default CardContainer;
