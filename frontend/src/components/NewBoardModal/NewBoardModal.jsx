import React, { useState } from 'react';
import './NewBoardModal.css';

function NewBoardModal({ isOpen, onClose, onCreateBoard }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.category) {
      alert('Title and category are required!');
      return;
    }

    await onCreateBoard(formData);

    setFormData({
      title: '',
      category: '',
      author: '',
      image: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Create New Board</h2>
        <form onSubmit={handleSubmit} className="board-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter board title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Celebration">Celebration</option>
              <option value="Thank you">Thank You</option>
              <option value="Inspiration">Inspiration</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="author">Author (optional)</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL (optional)</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewBoardModal;
