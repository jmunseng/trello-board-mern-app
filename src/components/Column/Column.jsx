import React, { useEffect, useRef, useState } from 'react';

import { mapOrder } from '../../utilities/sorts';
import Card from '../Card/Card';
import ComfirmModal from '../Common/ConfirmModal';

import {
  MODAL_ACTION_CLOSE,
  MODAL_ACTION_COMFIRM,
} from '../../utilities/constant';

import { Container, Draggable } from 'react-smooth-dnd';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import './Column.scss';

const Column = (props) => {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOrder(column.cards, column.cardOrder, 'id');

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [titleColumn, setTitleColumn] = useState('');
  const [isFirstClick, setIsFirstClick] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (column && column.title) {
      setTitleColumn(column.title);
    }
  }, [column]);

  const toggleModal = () => {
    setIsShowModalDelete(!isShowModalDelete);
  };

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CLOSE) {
      // save
    }
    //remove column
    if (type === MODAL_ACTION_COMFIRM) {
      const newColumn = {
        ...column,
        _destroy: true,
      };
      onUpdateColumn(newColumn);
    }
  };

  const selectAllText = (event) => {
    setIsFirstClick(false);
    if (isFirstClick) {
      event.target.select();
    } else {
      inputRef.current.setSelectionRange(
        titleColumn.length,
        titleColumn.length
      );
      // event.target.focus();
    }
    // event.target.select();
  };

  const handleClickOutside = () => {
    //save
    setIsFirstClick(true);
    const newColumn = {
      ...column,
      title: titleColumn,
      _destroy: false,
    };
    onUpdateColumn(newColumn);
  };

  const handleKeyUpEnter = (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.target.blur();
    }
  };

  return (
    <>
      <div className="column">
        <header className="column-drag-handle">
          <div className="column-title">
            <Form.Control
              className="customize-input-column"
              size={'sm'}
              type="text"
              value={titleColumn}
              onChange={(event) => setTitleColumn(event.target.value)}
              onClick={selectAllText}
              onBlur={handleClickOutside}
              spellCheck="false"
              onMouseDown={(e) => e.preventDefault()}
              ref={inputRef}
              onKeyUp={handleKeyUpEnter}
            />
          </div>
          <div className="column-dropdown">
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-basic"
                size="sm"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Add card ...</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={toggleModal}>
                  Remove this column
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>
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
            <i className="fa fa-plus icon"></i> Add another card
          </div>
        </footer>
      </div>
      <ComfirmModal
        show={isShowModalDelete}
        title={'Remove a column'}
        content={`Are you sure to remove this column: <b>${column.title}</b>`}
        onAction={onConfirmModalAction}
      />
    </>
  );
};

export default Column;
