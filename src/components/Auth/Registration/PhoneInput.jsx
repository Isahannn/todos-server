import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Styles/RegistrationForm.module.css';

const PhoneInput = ({ name, label, value, onChange, error, ...props }) => (
  <div className={styles.inputGroup}>
    <label htmlFor={name} className={styles.label}>{label}</label>
    <input name={name} value={value} onChange={onChange} {...props} className={styles.input} />
    {error && <div className={styles.error}>{error}</div>}
  </div>
);

PhoneInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default PhoneInput;
