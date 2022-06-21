import React from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

import Card from '../Card/Card';
import { mapOrder } from '../../utilities/sorts';
import './Column.scss';

const Column = (props) => {
  const { column, onCardDrop } = props;
  const cards = mapOrder(column.cards, column.cardOrder, 'id');

  return (
    <div className="column">
      <header className="column-drag-handle">{column.title}</header>
      <div className="card-list">
        <Container
          {...column.props}
          groupName="col"
          onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview',
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards &&
            cards.length > 0 &&
            cards.map((card, index) => {
              return (
                <Draggable key={card.id}>
                  <Card card={card} />
                </Draggable>
              );
            })}
        </Container>
      </div>
      <footer>
        <div className="footer-action">
          <strong>+ Add another card</strong>
        </div>
      </footer>
    </div>
  );
};

export default Column;
