import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getBoard,
  getCardsByBoard,
  createCard,
  upvoteCard,
  deleteCard,
} from "../../api/api";
import BoardHeader from "../BoardHeader/BoardHeader";
import CardGrid from "../CardGrid/CardGrid";
import NewCardModal from "../NewCardModal/NewCardModal";
import "./BoardPage.css";

function BoardPage() {
  const { id } = useParams();

  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [showNewCardModal, setShowNewCardModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch board details and cards on mount (and whenever the id changes)
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [boardData, cardsData] = await Promise.all([
          getBoard(id),
          getCardsByBoard(id),
        ]);
        if (!cancelled) {
          setBoard(boardData);
          setCards(cardsData);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Create a card, then append the returned record to local state (no refetch)
  const handleAddCard = async (formData) => {
    const card = await createCard({ ...formData, boardId: Number(id) });
    setCards((prev) => [card, ...prev]);
    setShowNewCardModal(false);
  };

  // Upvote a card, then replace that one card with the updated record
  const handleUpvote = async (cardId) => {
    const updated = await upvoteCard(cardId);
    setCards((prev) => prev.map((c) => (c.id === cardId ? updated : c)));
  };

  // Delete a card, then filter it out of local state
  const handleDelete = async (cardId) => {
    await deleteCard(cardId);
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  };

  if (loading) return <p className="board-page__status">Loading board…</p>;
  if (error)
    return (
      <div className="board-page__status">
        <p>Could not load this board: {error}</p>
        <Link to="/">← Back to all boards</Link>
      </div>
    );
  if (!board)
    return (
      <div className="board-page__status">
        <p>Board not found.</p>
        <Link to="/">← Back to all boards</Link>
      </div>
    );

  return (
    <div className="board-page">
      <Link to="/" className="board-page__back">
        ← Back to all boards
      </Link>

      <BoardHeader
        board={board}
        onAddCardClick={() => setShowNewCardModal(true)}
      />

      <CardGrid cards={cards} onUpvote={handleUpvote} onDelete={handleDelete} />

      {showNewCardModal && (
        <NewCardModal
          boardId={Number(id)}
          onClose={() => setShowNewCardModal(false)}
          onSubmit={handleAddCard}
        />
      )}
    </div>
  );
}

export default BoardPage;
