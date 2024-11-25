import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerText}>Created BY: Isahan Gasanov</div>
      <div className={styles.footerText}>BSU:2024</div>
    </div>
  );
}
