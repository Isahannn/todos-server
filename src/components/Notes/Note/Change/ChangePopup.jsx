import React, { useState } from 'react';
import styles from './ChangePopup.module.css';

const ChangePopup = ({ note, onEdit }) => {
    const [editedNote, setEditedNote] = useState(note);

    const handleChange = () => {
        if (typeof onEdit === 'function') {
            onEdit(editedNote);
        } else {
            console.error('onEdit is not a function');
        }
    };

    return (
        <div className={styles.changePopup}>
            <button onClick={handleChange} className={styles.changeButton}>✍️</button>
        </div>
    );
};

export default ChangePopup;
