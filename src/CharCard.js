import React from 'react';
import { Card, Image, List} from 'semantic-ui-react'



class CharCard extends React.Component {

  handleClick = (attributeKey, attributeValue) => {
    this.props.setCard(attributeKey, attributeValue)
    
  }
                 
  render() {
    return (
     <Card>
      <div className="char-img">
       <Image src={this.props.card.imageurl} wrapped ui={false} className="Medium" />
       </div>
        <Card.Content>
          <Card.Header name="name" className="char-name">{this.props.card.name}</Card.Header>
              
          <Card.Description className="card-description">
            {this.props.card.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <List>
          <List.Item>
            <List.Content className="flicker-1" onClick={() => this.handleClick('apperception', this.props.card.apperception)}>Apperception: {this.props.card.apperception}</List.Content>
          </List.Item>
          <List.Item>
            <List.Content className="flicker-2" onClick={() => this.handleClick('charm', this.props.card.charm)}>Charm: {this.props.card.charm}</List.Content>
          </List.Item>
          <List.Item>
            <List.Content className="flicker-3" onClick={() => this.handleClick('aggression', this.props.card.aggression)}>Aggression: {this.props.card.aggression}</List.Content>
          </List.Item>
        </List>
      </Card.Content>
     </Card>
      
    )
  }
}



export default CharCard;
