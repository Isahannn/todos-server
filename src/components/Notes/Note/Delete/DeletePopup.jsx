import React from 'react';
import styles from './DeletePopup.module.css';

const DeletePopup = ({ onDelete }) => {
  return (
    <div className={styles.deletePopup}>
      <button onClick={onDelete} className={styles.deleteButton}>🗑</button>
    </div>
  );
};

export default DeletePopup;
