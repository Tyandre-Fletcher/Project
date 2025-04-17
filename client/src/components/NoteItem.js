import React from 'react';

function NoteItem({ note, onDelete, onEdit }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="note-item">
      <h3>{note.title}</h3>
      <p className="note-content">{note.content}</p>
      <p className="note-date">Created: {formatDate(note.createdAt)}</p>
      <div className="note-actions">
        <button className="btn edit" onClick={() => onEdit(note)}>
          Edit
        </button>
        <button className="btn delete" onClick={() => onDelete(note._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteItem;
