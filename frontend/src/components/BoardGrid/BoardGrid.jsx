import React from 'react';
import BoardCard from '../BoardCard/BoardCard';
import './BoardGrid.css';

function BoardGrid({ boards, onDeleteBoard }) {
  if (boards.length === 0) {
    return (
      <div className="board-grid-empty">
        <p>No boards found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="board-grid">
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          onDelete={onDeleteBoard}
        />
      ))}
    </div>
  );
}

export default BoardGrid;
