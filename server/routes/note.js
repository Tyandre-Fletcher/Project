const express = require('express');
const router = express.Router();
const Note = require('../models/notes');
const User = require('../models/user');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) return res.status(404).json({ message: 'Note not found' });
    
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'You are not authorized' });
    }
    
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    user: req.user.id
  });
  
  try {
    const newNote = await note.save();
    
    await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { noteCount: 1 } }
    );
    
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
  
    const note = await Note.findById(req.params.id);
    
    if (!note) return res.status(404).json({ message: 'Note not found' });
    
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'You are not authorized' });
    }
    
    const updatedNote = await Note.findByIdAndUpdate(req.params.id,
      {
        title: req.body.title,
        content: req.body.content
      },
      { new: true }
    );
   
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) return res.status(404).json({ message: 'Note not found' });
    
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Your are not authorized' });
    }
    
    const removedNote = await Note.findByIdAndDelete(req.params.id);
    
    await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { noteCount: -1 } }
    );
    
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;