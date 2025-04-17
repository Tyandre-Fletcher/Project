import React, { useState, useEffect } from 'react';

function NoteForm({ addNote, editingNote, updateNote, setEditingNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;

    if (editingNote) {
      updateNote(editingNote._id, { title, content });
    } else {
      addNote({ title, content });
    }

    setTitle('');
    setContent('');
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setTitle('');
    setContent('');
  };

  return (
    <div className="note-form">
      <h2>{editingNote ? 'Edit Note' : 'Add New Note'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn">
            {editingNote ? 'Update Note' : 'Add Note'}
          </button>
          {editingNote && (
            <button type="button" className="btn cancel" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default NoteForm;