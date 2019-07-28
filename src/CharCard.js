import React from 'react';
import { Card, Image, List} from 'semantic-ui-react'


const CharCard = (props) => (
            
        <>
        
          <Card>
            
            <Image src={props.card.imageurl} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{props.card.name}</Card.Header>
              
              <Card.Description>
                {props.card.description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <List>
              <List.Item>
                {/* <List.Icon name='brain' />
                <i class="fas fa-brain"></i> */}
                <List.Content>Apperception: {props.card.apperception}</List.Content>
              </List.Item>
              <List.Item>
                {/* <List.Icon name='marker' /> */}
                <List.Content>Charm: {props.card.charm}</List.Content>
              </List.Item>
              <List.Item>
                {/* <List.Icon name='mail' /> */}
                <List.Content>Aggression: {props.card.aggression}</List.Content>
              </List.Item>
            </List>
            </Card.Content>
          </Card>
          </>
        );


export default CharCard;
