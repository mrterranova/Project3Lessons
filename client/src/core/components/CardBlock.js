import React from 'react'
import { Card } from 'react-bootstrap'


const CardBlock = (props) => {

  console.log(props)

  return (
    <Card style={{ width: '12rem', height: '20rem' }}>
      <Card.Img src="/images/scroll.png" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.keyTerms}
          <p>{props.scriptures}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CardBlock;