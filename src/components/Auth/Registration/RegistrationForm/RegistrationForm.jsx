import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { validationSchema } from '../../../../Validation/validation';
import TextInput from '../TextInput';
import PasswordInput from '../PasswordInput';
import ImageUpload from '../ImageUpload';
import { Link } from 'react-router-dom';
import styles from './RegistrationForm.module.css';
import UNKUser from '../../../../assest/image/UNKNW.jpg';
import { STRENGTHCOLORS, STRENGTHMESSAGES } from './Strenght';

const RegistrationForm = ({ onSubmit, loading, error }) => {
  const [values, setValues] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    countryCode: '+375',
    avatar: UNKUser,
    createdAd: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);

  const handlePasswordChange = (value) => {
    setValues((prevValues) => ({ ...prevValues, password: value }));
    setIsPasswordEmpty(value === '');
    setPasswordStrength(getPasswordStrength(value));
  };

  const handleFieldChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleUserNameChange = async (value) => {
    try {
      const response = await fetch(`http://localhost:5001/users?userName=${value}`);
      const users = await response.json();
      
      if (users.length > 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          userName: 'User name already exists'
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          userName: ''
        }));
      }

      setValues((prevValues) => ({ ...prevValues, userName: value }));
    } catch (error) {
      console.error("Error checking username:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        userName: 'Error checking username'
      }));
    }
  };

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setValues((prevValues) => ({ ...prevValues, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'password') {
      handlePasswordChange(value);
    } else if (name === 'userName') {
      handleUserNameChange(value);
    } else {
      handleFieldChange(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match'
      }));
      return;
    }

    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString('en-US', { hour12: false });
    const formattedDate = currentDate.toISOString().split('T')[0];
    const createdAd = `${formattedDate} ${formattedTime}`;

    const updatedValues = { ...values, createdAd };

    const parsedValues = validationSchema.safeParse(updatedValues);

    if (!parsedValues.success) {
      const validationErrors = parsedValues.error.errors.reduce(
        (acc, { path, message }) => {
          acc[path[0]] = message;
          return acc;
        },
        {}
      );
      setErrors(validationErrors);
    } else {
      setErrors({});
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(values.password, salt);
      await onSubmit({ ...updatedValues, password: hashedPassword });
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[@$!%*?&#]/.test(password)) strength += 1;
    return strength;
  };

  const renderPasswordStrength = () => {
    return (
      <div className={styles.passwordStrength}>
        <p>
          Password Strength: {' '}
          {isPasswordEmpty ? 'Not entered' : STRENGTHMESSAGES[passwordStrength]}
        </p>
        <div className={styles.strengthBar}>
          <div
            className={styles.strengthLevel}
            style={{
              width: isPasswordEmpty ? '0%' : `${(passwordStrength / 6) * 100}%`,
              backgroundColor: isPasswordEmpty ? '#e0e0e0' : STRENGTHCOLORS[passwordStrength],
            }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.linksContainer}>
        <Link to="/" className={styles.link}>
          Back to Home
        </Link>
        <Link to="/login" className={styles.link}>
          Back to Login
        </Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.formTitle}>Registration</h1>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.inputGroup}>
          <TextInput
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
          />
        </div>

        <div className={styles.inputGroup}>
          <TextInput
            name="userName"
            label="Username"
            value={values.userName}
            onChange={handleChange}
            error={errors.userName}
          />
        </div>

        <div className={styles.inputGroup}>
          <TextInput
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>

        <div className={styles.inputGroup}>
          <PasswordInput
            name="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />
          {renderPasswordStrength()}
        </div>

        <div className={styles.inputGroup}>
          <PasswordInput
            name="confirmPassword"
            label="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
        </div>

        <div className={styles.phoneInputGroup}>
          <div className={styles.countryCodeContainer}>
            <select
              name="countryCode"
              value={values.countryCode}
              onChange={handleChange}
              className={styles.countryCode}
            >
              <option value="+375">+375</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+7">+7</option>
            </select>
          </div>
          <TextInput
            name="phone"
            label="Phone"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="avatar" className={styles.label}>
            Avatar (optional)
          </label>
          <ImageUpload onFileChange={handleFileChange} />
          {errors.avatar && <div className={styles.error}>{errors.avatar}</div>}
        </div>

        {values.avatar !== UNKUser && (
          <div className={styles.avatarContainer}>
            <img src={values.avatar} alt="Avatar" className={`${styles.avatar} rounded-full`} />
          </div>
        )}

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Registering...' : 'Sign up'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
