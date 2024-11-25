import React, { useState } from 'react';
import DeletePopup from '../Delete/DeletePopup';
import ChangePopup from '../Change/ChangePopup';
import styles from './NoteItem.module.css';
import { useNavigate } from 'react-router-dom';

const NoteItem = ({ note, onChecked, onDelete, onEdit }) => {
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowDeleteMenu(true);
    setShowEditMenu(true);
  };

  const handleMouseLeave = () => {
    setShowDeleteMenu(false);
    setShowEditMenu(false);
  };

  const handleDelete = () => {
    onDelete(note.id);
    setShowDeleteMenu(false);
  };

  const handleEdit = (updatedNote) => {
    onEdit(updatedNote);
    setShowEditMenu(false);
  };

  const handleClick = (id) => {
    navigate(`/notes/${id}`);
  };


  return (
    <div
      className={styles.noteItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.noteHeader}>
        <input
          type="checkbox"
          checked={note.checked}
          onChange={() => onChecked(note.id)}
          className={styles.checkbox}
        />
        <div
          className={styles.noteDetails}
          onClick={() => handleClick(note.id)}
        >
          <span className={styles.noteName}>{note.name}</span>
          <div className={styles.noteDescription}>{note.description}</div>
          <div className={styles.noteSeverity}>
            {note.severity === 1
              ? 'Urgently'
              : note.severity === 2
                ? 'Medium'
                : 'Not Urgent'}
          </div>
        </div>
        <div className={styles.timestamp}>
          {new Date(note.timestamp).toLocaleString()}
        </div>
      </div>
      <div className={styles.noteActions}>

        {showDeleteMenu && <DeletePopup onDelete={handleDelete} />}
        {showEditMenu && <ChangePopup note={note} onEdit={handleEdit} />}
      </div>
    </div>
  );
};

export default NoteItem;
