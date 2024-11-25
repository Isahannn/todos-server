import bcrypt from 'bcryptjs';

const API_URL = 'http://localhost:5001/notes';

export const fetchNotes = async (userId) => {
  const response = await fetch(`${API_URL}?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes from the server:', response.statusText);
  }
  return await response.json();
};

export const saveNoteToDB = async (note) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error('Failed to save note to the server:', response.statusText);
  }
  return await response.json();
};

export const deleteNoteFromDB = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete note from the server:', response.statusText);
  }
};

export const fetchNoteById = async (noteId) => {
  const response = await fetch(`${API_URL}/${noteId}`);
  if (!response.ok) {
    throw new Error('Note not found');
  }
  return await response.json();
};

export const updateNoteInDB = async (id, updatedNote) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedNote),
  });
  if (!response.ok) {
    throw new Error('Failed to update note on the server:', response.statusText);
  }
  return await response.json();
};

export const comparePasswords = async (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
