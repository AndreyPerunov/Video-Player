import React from "react"

function Card(props) {
  return <div className={"card " + (props.modifier ? "card--" + props.modifier : "")}></div>
}

export default Card
