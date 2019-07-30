import React from 'react';
import { Header, Image, Table } from 'semantic-ui-react'

const ScoreCard = (props) => {
  let images = ['https://react.semantic-ui.com/images/avatar/small/lena.png' ,
  'https://react.semantic-ui.com/images/avatar/small/matthew.png',
  'https://react.semantic-ui.com/images/avatar/small/lindsay.png',
  'https://react.semantic-ui.com/images/avatar/small/mark.png'
  ]

  return (
    <Table.Row>
    <Table.Cell>
      <Header as='h2' image>
        <Image src={images[Math.floor(Math.random()*images.length)]} rounded size='mini' />
        <Header.Content>
          {props.userScore.key}
          {/* <Header.Subheader>Human Resources</Header.Subheader> */}
        </Header.Content>
      </Header>
    </Table.Cell>
    <Table.Cell>{props.userScore.value}</Table.Cell>
  </Table.Row>
  );
};

export default ScoreCard;