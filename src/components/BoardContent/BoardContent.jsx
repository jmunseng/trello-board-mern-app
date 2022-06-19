import React, { useState, useEffect } from 'react';
import Column from '../Column/Column';
import { Container, Draggable } from 'react-smooth-dnd';
import _, { isEmpty } from 'lodash';
import { mapOrder } from '../../utilities/sorts';

import { initData } from '../../actions/initData';
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
    console.log('>>> inside onColumnDrop', dropResult);
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
                <Column key={index} column={column} />;
              </Draggable>
            );
          })}
      </Container>
    </div>
  );
};

export default BoardContent;
