import React from "react"
import Card from "./Card"

function Cards(props) {
  const cards = []
  for (let i = 0; i < props.amount; i++) cards.push(<Card key={i} modifier={props.modifier} />)

  return cards
}

export default Cards
