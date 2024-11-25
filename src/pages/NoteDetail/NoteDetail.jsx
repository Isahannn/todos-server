import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchNoteById,
  updateNoteInDB,
  deleteNoteFromDB,
} from '../../../src/components/service/noteService';
import ErrorPage from '../ErrorPage/ErrorPage';
import Modal from './Modal/Modal';
import styles from './NoteDetail.module.css';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState(1);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await fetchNoteById(id);
        setNote(data);
        setValue(data.name);
        setDescription(data.description || ''); 
        setSeverity(data.severity);
      } catch (err) {
        setError('Oops, this note no longer exists.');
      }
    };

    fetchNote();
  }, [id]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setHasChanges(true);
  };

  const handleSave = () => {
    if (!note) return;

    if (!value.trim()) {
      alert('Name cannot be empty.');
      return;
    }

    if (hasChanges) {
      setIsConfirmModalOpen(true);
    } else {
      handleCancelEdit();
    }
  };

  const handleConfirmSave = async () => {
    const updatedNote = {
      ...note,
      name: value,
      description: description.trim(), 
      severity,
    };

    try {
      const data = await updateNoteInDB(id,updatedNote);
      setNote(data);
      setIsEditMode(false);
      setIsConfirmModalOpen(false);
      setHasChanges(false);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNoteFromDB(id);
      navigate('/notes');
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setValue(note.name);
    setDescription(note.description || ''); 
    setSeverity(note.severity);
    setHasChanges(false);
  };

  const handleBack = () => {
    navigate('/notes');
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  if (!note) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Note Details</h2>
      {isEditMode ? (
        <div>
          <div className="flex items-center mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              className={styles.inputField}
              value={value}
              onChange={handleInputChange(setValue)}
            />
            <button className={styles.saveButton} onClick={handleSave}>
              Save
            </button>
            <button className={styles.deleteButton} onClick={openDeleteModal}>
              Delete
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              className={styles.textareaField}
              value={description}
              onChange={handleInputChange(setDescription)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Severity</label>
            <select
              id={`severity-${note.id}`}
              value={severity}
              onChange={handleInputChange(setSeverity)}
              className={styles.selectField}
            >
              <option value={1}>Urgently</option>
              <option value={2}>Medium</option>
              <option value={3}>Not Urgent</option>
            </select>
          </div>
          <button className={styles.cancelButton} onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <p className={styles.noteTitle}>{note.name}</p>
            <button className={styles.editButton} onClick={handleEdit}>
              ✍️
            </button>
            <button className={styles.deleteButton} onClick={openDeleteModal}>
              🗑
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <p
              className={`${styles.noteDescription} ${
                !note.description ? styles.noDescription : ''
              }`}
            >
              {note.description ? note.description : 'No description provided.'}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Severity</label>
            <p className={styles.noteSeverity}>{note.severity}</p>
          </div>
        </div>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      >
        <h2 className="text-xl font-bold mb-4">Delete Note</h2>
        <p>Are you sure you want to delete this note?</p>
      </Modal>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmSave}
      >
        <h2 className="text-xl font-bold mb-4">Save Changes</h2>
        <p>Are you sure you want to save these changes?</p>
      </Modal>
    </div>
  );
};

export default NoteDetail;
