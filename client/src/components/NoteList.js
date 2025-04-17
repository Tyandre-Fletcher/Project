import React from 'react';
import NoteItem from './NoteItem';

function NoteList({ notes, onDelete, onEdit }) {
  if (notes.length === 0) {
    return <p className="no-notes">No notes yet. Create one!</p>;
  }

  return (
    <div className="note-list">
      <h2>Your Notes</h2>
      <div className="notes-container">
        {notes.map(note => (
          <NoteItem 
            key={note._id} 
            note={note} 
            onDelete={onDelete} 
            onEdit={onEdit} 
          />
        ))}
      </div>
    </div>
  );
}

export default NoteList;