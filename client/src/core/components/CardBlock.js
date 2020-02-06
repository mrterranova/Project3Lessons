import React from 'react'
import { Card } from 'react-bootstrap'


const CardBlock = (props) => {

  return (
    <Card key={props._id} style={{ width: '12rem', height: '20rem' }}>
      <Card.Img src="/images/scroll.png" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.keyTerms}
          <br />
          {props.scriptures}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CardBlock;