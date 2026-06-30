import React from "react";
import "./CardTile.css";

function CardTile({ card, onUpvote, onDelete }) {
  return (
    <div className="card-tile">
      <p className="card-tile__message">{card.message}</p>

      {card.gifUrl && (
        <img className="card-tile__gif" src={card.gifUrl} alt="" />
      )}

      {card.author && (
        <p className="card-tile__author">— {card.author}</p>
      )}

      <div className="card-tile__actions">
        <button
          className="card-tile__upvote"
          onClick={() => onUpvote(card.id)}
        >
          👍 {card.upvotes}
        </button>
        <button
          className="card-tile__delete"
          onClick={() => onDelete(card.id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default CardTile;
