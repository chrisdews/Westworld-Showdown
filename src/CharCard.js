import React from 'react';
import { Card, Image, List} from 'semantic-ui-react'



class CharCard extends React.Component {

  handleClick = (attributeKey, attributeValue) => {
    this.props.setCard(attributeKey, attributeValue)
    
  }
                 
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
                <List.Content onClick={() => this.handleClick('apperception', this.props.card.apperception)}>Apperception: {this.props.card.apperception}</List.Content>
              </List.Item>
              <List.Item>
                <List.Content onClick={() => this.handleClick('charm', this.props.card.charm)}>Charm: {this.props.card.charm}</List.Content>
              </List.Item>
              <List.Item>
                <List.Content onClick={() => this.handleClick('aggression', this.props.card.aggression)}>Aggression: {this.props.card.aggression}</List.Content>
              </List.Item>
        </List>
      </Card.Content>
     </Card>
      
    )
  }
}



export default CharCard;
