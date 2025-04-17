import React, { useState, useEffect } from 'react';
import { useAuth } from './auth/AuthContext';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

const API_URL = 'http://localhost:5000/api';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/notes`, {
        headers: {
          'x-auth-token': token
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async (note) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(note),
      });
     
      if (!response.ok) {
        throw new Error('Failed to add note');
      }
     
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const updateNote = async (id, updatedNote) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(updatedNote),
      });
     
      if (!response.ok) {
        throw new Error('Failed to update note');
      }
     
      setEditingNote(null);
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token
        }
      });
     
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
     
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h2>Welcome, {currentUser?.username}!</h2>
        <p>You have {notes.length} note{notes.length !== 1 ? 's' : ''}</p>
      </div>
      <NoteForm
        addNote={addNote}
        editingNote={editingNote}
        updateNote={updateNote}
        setEditingNote={setEditingNote}
      />
      <NoteList
        notes={notes}
        onDelete={deleteNote}
        onEdit={setEditingNote}
      />
    </div>
  );
}

export default Dashboard;