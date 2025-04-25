import { useState } from 'react';
import styles from './equipment.module.css';

const FilterMenu = ({ show, onClose, currentFilters, onApply }) => {
  const [price, setPrice] = useState(currentFilters.price);
  const [size, setSize] = useState(currentFilters.size);
  const [category, setCategory] = useState(currentFilters.category || 'all');

  const handleApply = () => {
    onApply({ price, size, category });
    onClose();
  };

  const handleReset = () => {
    setPrice(1000);
    setSize('all');
    setCategory('all');
    onApply({ price: 1000, size: 'all', category: 'all' });
  };

  return (  
    <div className={`${styles.filterMenu} ${show ? styles.open : ''}`}>
      <div className={styles.filterHeader}>
        <h3 className={styles.filterTitle}>Фільтри</h3>
        <button className={styles.filterClose} onClick={onClose}>
          &times;
        </button>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="price-range">Максимальна ціна: {price} грн</label>
        <input
          type="range"
          id="price-range"
          min="100"
          max="1000"
          step="50"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          className={styles.priceSlider}
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="size-filter">Розмір:</label>
        <select
          id="size-filter"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className={styles.sizeFilter}
        >
          <option value="all">Всі розміри</option>
          <option value="small">Маленький</option>
          <option value="medium">Середній</option>
          <option value="large">Великий</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="category-filter">Категорія:</label>
        <select
          id="category-filter"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.sizeFilter}
        >
          <option value="all">Всі категорії</option>
          <option value="cycling">Велосипеди</option>
          <option value="winter">Зимовий спорт</option>
          <option value="water">Водний спорт</option>
          <option value="urban">Міський спорт</option>
          <option value="golf">Гольф</option>
          <option value="team">Командні види</option>
          <option value="tennis">Теніс</option>
          <option value="fitness">Фітнес</option>
          <option value="hiking">Туризм</option>
        </select>
      </div>

      <button className={styles.filterReset} onClick={handleReset} >
        Скинути фільтри
      </button>

      <button className={styles.confirmRental} onClick={handleApply}>
        Застосувати фільтри
      </button>
    </div>
  );
};

export default FilterMenu;