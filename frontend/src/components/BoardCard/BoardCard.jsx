import React from 'react';
import './BoardCard.css';

function BoardCard({ board, onDelete }) {
  return (
    <div className="board-card">
      {board.image && (
        <img
          src={board.image}
          alt={board.title}
          className="board-card-image"
        />
      )}
      <div className="board-card-content">
        <h3 className="board-card-title">{board.title}</h3>
        <span className="board-card-category">{board.category}</span>
        {board.author && (
          <p className="board-card-author">by {board.author}</p>
        )}
      </div>
      <button
        className="board-card-delete"
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm(`Delete board "${board.title}"?`)) {
            onDelete(board.id);
          }
        }}
        aria-label="Delete board"
      >
        ×
      </button>
    </div>
  );
}

export default BoardCard;
