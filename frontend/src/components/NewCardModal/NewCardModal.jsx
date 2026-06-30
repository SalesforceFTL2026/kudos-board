import React, { useState } from "react";
import "./NewCardModal.css";

function NewCardModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    message: "",
    gifUrl: "",
    author: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!formData.message.trim()) next.message = "Message is required";
    if (!formData.gifUrl.trim()) next.gifUrl = "A GIF is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      // author is optional — only send it if provided
      const payload = {
        message: formData.message.trim(),
        gifUrl: formData.gifUrl.trim(),
      };
      if (formData.author.trim()) payload.author = formData.author.trim();
      await onSubmit(payload);
    } catch (err) {
      setErrors({ form: err.message });
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2>Add a New Card</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
            />
          </label>
          {errors.message && <p className="modal__error">{errors.message}</p>}

          {/*
            TODO: Step 4 — replace this text input with the <GifPicker />
            component. GifPicker should call setFormData to set `gifUrl`.
          */}
          <label>
            GIF URL
            <input
              type="text"
              name="gifUrl"
              value={formData.gifUrl}
              onChange={handleChange}
              placeholder="https://media.giphy.com/..."
            />
          </label>
          {errors.gifUrl && <p className="modal__error">{errors.gifUrl}</p>}

          {formData.gifUrl && (
            <img
              className="modal__gif-preview"
              src={formData.gifUrl}
              alt="Selected GIF preview"
            />
          )}

          <label>
            Author (optional)
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </label>

          {errors.form && <p className="modal__error">{errors.form}</p>}

          <div className="modal__actions">
            <button type="button" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" disabled={submitting}>
              {submitting ? "Adding…" : "Add Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewCardModal;
