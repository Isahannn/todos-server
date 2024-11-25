import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import NoteItem from '../Note/NoteItem/NoteItem';
import styles from './NotesList.module.css';

const NotesList = ({
  notes,
  onChecked,
  onDelete,
  onMouseEnter,
  onMouseLeave,
  onEdit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const handleDeleteClick = (noteId) => {
    setSelectedNoteId(noteId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(selectedNoteId);
    setIsModalOpen(false);
    setSelectedNoteId(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNoteId(null);
  };

  const sortedNotes = notes.sort((a, b) => a.checked - b.checked);

  return (
    <div>
      <ul className={styles.notesList}>
        {sortedNotes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onChecked={onChecked}
            onDelete={handleDeleteClick}
            onEdit={onEdit}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default NotesList;
