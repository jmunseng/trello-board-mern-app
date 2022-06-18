import React from 'react';
import './Card.scss';
const Card = (props) => {
  const { card } = props;
  return (
    <li className="card-item">
      {card.image && <img src={card.image} className="card-cover" alt="" />}
      {card.title}
    </li>
  );
};

export default Card;
