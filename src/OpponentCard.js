import React from 'react';
import { Card, Image, List} from 'semantic-ui-react'



class OpponentCard extends React.Component {

                 
  render() {
    return (
     <Card>
      <Image src={this.props.card.imageurl} wrapped ui={false} />
        <Card.Content>
          <Card.Header name="name">{this.props.card.name}</Card.Header>
              
          <Card.Description>
            {this.props.card.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        
        <List>
              <List.Item>
              {this.props.showCardStats ? <List.Content>Apperception: {this.props.card.apperception}</List.Content> : '?' }
              </List.Item>
              <List.Item>
              {this.props.showCardStats ? <List.Content>Charm: {this.props.card.charm}</List.Content> : '?' }
              </List.Item>
              <List.Item>
              {this.props.showCardStats ? <List.Content>Aggression: {this.props.card.aggression}</List.Content> : '?' }
              </List.Item>
        </List> 
      </Card.Content>
     </Card>
      
    )
  }
}



export default OpponentCard;
