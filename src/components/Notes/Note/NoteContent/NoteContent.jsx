import React from 'react';
import styles from './NoteContent.module.css';

const NoteContent = ({ note, onChecked }) => {
  const handleCheckboxChange = () => {
    onChecked(note.id);
  };

  return (
    <div className={styles.noteContent}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={note.checked}
        onChange={handleCheckboxChange}
      />
      <div className={styles.noteText}>
        <span
          className={`${styles.noteName} ${note.checked ? styles.textChecked : ''}`}
        >
          {note.name}
        </span>
        <div className={styles.noteDescription}>{note.description}</div>
        <div className={styles.noteSeverity}>
          The level of urgency:{' '}
          {note.severity === 1
            ? 'Urgently'
            : note.severity === 2
              ? 'Medium'
              : 'Not urgent'}
        </div>
      </div>
    </div>
  );
};

export default NoteContent;
