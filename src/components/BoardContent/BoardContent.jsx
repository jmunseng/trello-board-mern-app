import React, { useState, useEffect } from 'react';
import Column from '../Column/Column';
import { Container, Draggable } from 'react-smooth-dnd';
import _, { isEmpty } from 'lodash';
import { mapOrder } from '../../utilities/sorts';

import { initData } from '../../actions/initData';

import { applyDrag } from '../../utilities/dragDrop';

import './BoardContent.scss';

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardInitData = initData.boards.find((item) => item.id === 'board-1');
    if (boardInitData) {
      setBoard(boardInitData);

      // sort columns  ?? 不理解
      // boardInitData.columns.sort((a, b) => {
      //   return (
      //     boardInitData.columnOrder.indexOf(a.id) -
      //     boardInitData.columnOrder.indexOf(b.id)
      //   );
      // });
      setColumns(
        mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id')
      );
      setColumns(boardInitData.columns);
    }
  }, []);

  if (isEmpty(board)) {
    return (
      <>
        <div className="not-found">Board not found</div>
      </>
    );
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  const onCardDrop = (dropResult, columnId) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      console.log(
        '>>> inside onCardDrop:',
        dropResult,
        'with columnId =',
        columnId
      );
      let newColumns = [...columns];

      let currentColumn = newColumns.find((column) => column.id === columnId);

      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);

      console.log('currentColumn ', currentColumn.cards);

      currentColumn.cardOrder = currentColumn.cards.map((card) => card.id);

      setColumns(newColumns);
    }
  };
  return (
    <div className="board-columns">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview',
        }}
      >
        {columns &&
          columns.length > 0 &&
          columns.map((column, index) => {
            return (
              <Draggable key={column.id}>
                <Column key={index} column={column} onCardDrop={onCardDrop} />;
              </Draggable>
            );
          })}
        <div className="add-new-column">
          <strong> + Add another column</strong>
        </div>
      </Container>
    </div>
  );
};

export default BoardContent;
