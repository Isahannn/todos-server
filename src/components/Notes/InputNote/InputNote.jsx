import React, { useState, useEffect } from 'react';
import styles from './InputNote.module.css';

const severityLevels = {
  1: "Urgently",
  2: "Medium",
  3: "Not urgent"
};

const InputNote = ({ onAdd, editMode, note, onCancelEdit, onSaveEdit }) => {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState(1);
  const [errors, setErrors] = useState({});
  const [originalNote, setOriginalNote] = useState({});

  useEffect(() => {
    if (editMode && note) {
      setValue(note.name);
      setDescription(note.description);
      setSeverity(note.severity);
      setOriginalNote(note);  
    }
  }, [editMode, note]);

  const handleAdd = () => {
    const trimmedValue = value.trim();
    const trimmedDescription = description.trim();
    const validationErrors = validate(trimmedValue);

    if (Object.keys(validationErrors).length === 0) {
      const newNote = {
        id: Date.now(),
        name: trimmedValue,
        description: trimmedDescription,
        severity: severity,
        timestamp: new Date().toISOString(),
        checked: false
      };
      onAdd(newNote);
      setValue('');
      setDescription('');
      setSeverity(1);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleSave = () => {
    const trimmedValue = value.trim();
    const trimmedDescription = description.trim();
    const validationErrors = validate(trimmedValue);

    if (Object.keys(validationErrors).length === 0) {
      onSaveEdit(trimmedValue, trimmedDescription, severity);
      setValue('');
      setDescription('');
      setSeverity(1);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleCancelEdit = () => {
    setValue(originalNote.name);  
    setDescription(originalNote.description);
    setSeverity(originalNote.severity);
    onCancelEdit();
  };

  const validate = (name) => {
    const errors = {};
    if (!name) errors.name = 'The name of the task is required';
    return errors;
  };

  return (
    <div className={styles.inputNoteContainer}>
      <input
        type="text"
        className={`${styles.inputNote} ${errors.name ? styles.errorInput : ''}`}
        placeholder="The name of the note"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
      <textarea
        className={styles.textareaNote}
        placeholder="Description of the note (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className={styles.severityOptions}>
        {Object.keys(severityLevels).map((level) => (
          <button
            key={level}
            className={`${styles.severityButton} ${severity === Number(level) ? styles.active : ''}`}
            onClick={() => setSeverity(Number(level))}
          >
            {severityLevels[level]}
          </button>
        ))}
      </div>
      {editMode ? (
        <div>
        <div className={styles.buttonContainer}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
        </div>
      ) : (
        <button className={styles.addNoteButton} onClick={handleAdd}>Add</button>
      )}
    </div>
  );
};

export default InputNote;
