import React from "react";
import "./BoardHeader.css";

function BoardHeader({ board, onAddCardClick }) {
  return (
    <header className="board-header">
      <div className="board-header__info">
        <h1 className="board-header__title">{board.title}</h1>
        <span className="board-header__category">{board.category}</span>
        {board.author && (
          <p className="board-header__author">Created by {board.author}</p>
        )}
      </div>
      <button className="board-header__add-btn" onClick={onAddCardClick}>
        + Add Card
      </button>
    </header>
  );
}

export default BoardHeader;
