// API Contract Layer - Feature 3 (LOCKED)
// All developers import from here, never write raw fetch()

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Board API
export const getBoards = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_BASE}/boards?${params}`);
  if (!response.ok) throw new Error("Failed to fetch boards");
  return response.json();
};

export const getBoard = async (id) => {
  const response = await fetch(`${API_BASE}/boards/${id}`);
  if (!response.ok) throw new Error("Failed to fetch board");
  return response.json();
};

export const createBoard = async (data) => {
  const response = await fetch(`${API_BASE}/boards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create board");
  return response.json();
};

export const deleteBoard = async (id) => {
  const response = await fetch(`${API_BASE}/boards/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete board");
  return response.json();
};

// Card API
export const getCardsByBoard = async (boardId) => {
  const response = await fetch(`${API_BASE}/boards/${boardId}/cards`);
  if (!response.ok) throw new Error("Failed to fetch cards");
  return response.json();
};

export const createCard = async (data) => {
  const response = await fetch(`${API_BASE}/cards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create card");
  return response.json();
};

export const upvoteCard = async (id) => {
  const response = await fetch(`${API_BASE}/cards/${id}/upvote`, {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("Failed to upvote card");
  return response.json();
};

export const deleteCard = async (id) => {
  const response = await fetch(`${API_BASE}/cards/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete card");
  return response.json();
};
