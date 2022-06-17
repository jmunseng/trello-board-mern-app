import React from 'react';
import './Card.scss';
const Card = (props) => {
  return (
    <li className="card-item">
      <img
        src="https://raw.githubusercontent.com/haryphamdev/sharing-host-files/master/trello/img-design.png"
        alt="img1"
      />
      Design & Research
    </li>
  );
};

export default Card;
