import React, { useState, useEffect, useRef } from 'react';
import Column from '../Column/Column';
import { Container, Draggable } from 'react-smooth-dnd';
import _, { isEmpty } from 'lodash';
import { mapOrder } from '../../utilities/sorts';

import { initData } from '../../actions/initData';

import { applyDrag } from '../../utilities/dragDrop';
import { v4 as uuidv4 } from 'uuid';

import './BoardContent.scss';

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  const [isShowAddList, setIsShowAddList] = useState(false);
  const inputRef = useRef(null);
  const [valueInput, setValueInput] = useState('');

  useEffect(() => {
    if (isShowAddList === true && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowAddList]);

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

  const handleAddList = (value) => {
    if (!valueInput) {
      if (inputRef && inputRef.current) inputRef.current.focus();
      return;
    }
    //update board columns
    const _columns = _.cloneDeep(columns);
    _columns.push({
      id: uuidv4(),
      boardId: board.id,
      title: valueInput,
      cards: [],
    });

    setColumns(_columns);
    setValueInput('');
    inputRef.current.focus();
  };

  const onUpdateColumn = (newColumns) => {
    const columnIdUpdate = newColumns.id;
    let ncols = [...columns];
    let index = ncols.findIndex((item) => item.id === columnIdUpdate);

    if (newColumns._destroy) {
      //remove
      ncols.splice(index, 1);
    } else {
      //update title
      ncols[index] = newColumns;
    }
    setColumns(ncols);
  };

  //new edited columns
  console.log(columns);

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
                <Column
                  key={index}
                  column={column}
                  onCardDrop={onCardDrop}
                  onUpdateColumn={onUpdateColumn}
                />
                ;
              </Draggable>
            );
          })}
      </Container>
      {isShowAddList === false ? (
        <div className="add-new-column" onClick={() => setIsShowAddList(true)}>
          <i className="fa fa-plus icon"></i> Add another column
        </div>
      ) : (
        <div className="content-add-column">
          <input
            type="text"
            className="form-control"
            ref={inputRef}
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
          />
          <div className="group-btn">
            <button className="btn btn-success" onClick={() => handleAddList()}>
              Add list
            </button>
            <i
              className="fa fa-times"
              onClick={() => setIsShowAddList(false)}
            ></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardContent;
