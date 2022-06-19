import React from 'react';
import './Card.scss';
const Card = (props) => {
  const { card } = props;
  return (
    <div className="card-item">
      {card.image && (
        <img
          className="card-cover"
          src={card.image}
          // preventDefault Image prevent browser pull the image only
          onMouseDown={(e) => e.preventDefault()}
          alt=""
        />
      )}
      {card.title}
    </div>
  );
};

export default Card;
