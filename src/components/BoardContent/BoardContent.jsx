import React, { useState, useEffect } from 'react';
import Column from '../Column/Column';
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

      //sort columns  ?? 不理解
      // boardInitData.columns.sort(
      //   (a, b) =>
      //     boardInitData.columnOrder.indexOf(a.id) -
      //     boardInitData.columnOrder.indexOf(b.id)
      // );
      setColumns(
        mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id')
      );
      // setColumns(boardInitData.columns);
    }
  }, []);

  if (isEmpty(board)) {
    return (
      <>
        <div className="not-found">Board not found</div>
      </>
    );
  }

  return (
    <div className="board-columns">
      {columns &&
        columns.length > 0 &&
        columns.map((column, index) => {
          return <Column key={index} column={column} />;
        })}
    </div>
  );
};

export default BoardContent;
