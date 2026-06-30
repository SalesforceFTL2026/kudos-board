import React, { useState, useEffect } from 'react';
import { getBoards, createBoard, deleteBoard } from '../../api/api';
import FilterNav from '../FilterNav/FilterNav';
import SearchBar from '../SearchBar/SearchBar';
import BoardGrid from '../BoardGrid/BoardGrid';
import NewBoardModal from '../NewBoardModal/NewBoardModal';
import './HomePage.css';

function HomePage() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBoards();
  }, [activeFilter, searchQuery]);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      const filters = {};

      if (activeFilter !== 'all' && activeFilter !== 'recent') {
        filters.category = activeFilter;
      }

      if (searchQuery) {
        filters.search = searchQuery;
      }

      let fetchedBoards = await getBoards(filters);

      if (activeFilter === 'recent') {
        fetchedBoards = fetchedBoards.slice(0, 6);
      }

      setBoards(fetchedBoards);
    } catch (error) {
      console.error('Error fetching boards:', error);
      alert('Failed to load boards');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBoard = async (boardData) => {
    try {
      await createBoard(boardData);
      fetchBoards();
    } catch (error) {
      console.error('Error creating board:', error);
      alert('Failed to create board');
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoard(boardId);
      fetchBoards();
    } catch (error) {
      console.error('Error deleting board:', error);
      alert('Failed to delete board');
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Kudos Board</h1>
        <button
          className="btn-create-board"
          onClick={() => setIsModalOpen(true)}
        >
          + Create Board
        </button>
      </header>

      <FilterNav
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      <div className="home-content">
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="loading">Loading boards...</div>
        ) : (
          <BoardGrid boards={boards} onDeleteBoard={handleDeleteBoard} />
        )}
      </div>

      <NewBoardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateBoard={handleCreateBoard}
      />

      <footer className="home-footer">
        <p>© 2026 Kudos Board</p>
      </footer>
    </div>
  );
}

export default HomePage;
