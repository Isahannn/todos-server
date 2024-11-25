import React, { useEffect, useState } from 'react';
import styles from './SeverityFilter.module.css';
import { SEVERITY } from './Severity';

const SeverityFilter = ({ onFilterChange }) => {
  const levels = SEVERITY;

  const [filterSeverity, setFilterSeverity] = useState(() => {
    const savedFilters = localStorage.getItem('filterSeverity');
    return savedFilters ? JSON.parse(savedFilters) : [];
  });

  useEffect(() => {
    onFilterChange(filterSeverity);
  }, []); // Пустой массив зависимостей, чтобы вызвалось один раз при загрузке

  useEffect(() => {
    localStorage.setItem('filterSeverity', JSON.stringify(filterSeverity));
    onFilterChange(filterSeverity); // Вызываем только при изменении filterSeverity
  }, [filterSeverity]);

  const handleButtonClick = (levelValue) => {
    setFilterSeverity((prev) =>
      prev.includes(levelValue)
        ? prev.filter((level) => level !== levelValue)
        : [...prev, levelValue]
    );
  };

  return (
    <div className={styles.severityFilter}>
      {levels.map(({ name, value }) => (
        <button
          key={value}
          className={`${styles.severityButton} ${filterSeverity.includes(value) ? styles.active : ''}`}
          onClick={() => handleButtonClick(value)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default SeverityFilter;
