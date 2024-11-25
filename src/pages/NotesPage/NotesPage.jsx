import React, { useState, useEffect } from 'react';
import NotesList from '../../components/Notes/NoteList/NotesList';
import InputNote from '../../components/Notes/InputNote/InputNote';
import SeverityFilter from '../../components/Notes/Severity/SeverityFilter';
import SmartSearch from '../../components/Notes/search/SmartSearch';
import { useAuth } from '../../Context';
import shortid from 'shortid';
import styles from './NotesPage.module.css';
import {
  fetchNotes,
  saveNoteToDB,
  deleteNoteFromDB,
  updateNoteInDB,
} from '../../components/service/noteService';

const NotesPage = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const [notes, setNotes] = useState([]);
  const [filterSeverity, setFilterSeverity] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUserNotes = async () => {
      if (!userId) return;

      try {
        const data = await fetchNotes(userId);
        setNotes(data);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchUserNotes();
  }, [userId]);

  const addNote = async (note) => {
    const newNote = { ...note, id: shortid.generate(), userId };
    try {
      const savedNote = await saveNoteToDB(newNote);
      setNotes((prevNotes) => [...prevNotes, savedNote]);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleChecked = async (id) => {
    const updatedNote = notes.find((note) => note.id === id);
    if (updatedNote) {
      const newCheckedStatus = !updatedNote.checked;
      try {
        await updateNoteInDB({ ...updatedNote, checked: newCheckedStatus });
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === updatedNote.id
              ? { ...updatedNote, checked: newCheckedStatus }
              : note
          )
        );
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNoteFromDB(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleFilterChange = (newFilterSeverity) => {
    setFilterSeverity(newFilterSeverity);
  };

  const handleEdit = (note) => {
    setEditMode(true);
    setEditNote(note);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditNote(null);
  };

  const handleSaveEdit = async (name, description, severity) => {
    const updatedNote = { ...editNote, name, description, severity };
    try {
      await updateNoteInDB(updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
      setEditMode(false);
      setEditNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredNotes = notes
    .filter((note) =>
      note.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (note) =>
        filterSeverity.length === 0 || filterSeverity.includes(note.severity)
    );

  return (
    <div className={`${styles.pageContainer} ${isLoaded ? styles.loaded : ''}`}>
      <h1 className={styles.pageTitle}>Notes</h1>
      <SmartSearch onSearchChange={handleSearchChange} disabled={false} />
      <div className={styles.filterContainer}>
        <SeverityFilter
          filterSeverity={filterSeverity}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className={styles.notesList}>
        <NotesList
          notes={filteredNotes}
          onChecked={handleChecked}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      <div className={styles.inputNoteContainer}>
        <InputNote
          onAdd={addNote}
          editMode={editMode}
          note={editNote}
          onCancelEdit={handleCancelEdit}
          onSaveEdit={handleSaveEdit}
        />
      </div>
    </div>
  );
};

export default NotesPage;
