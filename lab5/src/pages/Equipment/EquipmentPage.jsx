import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import EquipmentList from '../../components/Equipment/EquipmentList';
import FilterMenu from '../../components/Equipment/FilterMenu';
import styles from './equipmentPage.module.css';

const EquipmentPage = () => {
  const [filters, setFilters] = useState({
    price: 1000,
    size: 'all',
    category: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <section id="equipment" className={styles.section}>
      <h2 className={styles.sectionTitle}>Наше обладнання</h2>

      <button className={styles.filterToggle} onClick={toggleFilters} aria-label="Фільтри">
        <FontAwesomeIcon icon={faBars} />
      </button>

      <FilterMenu 
        show={showFilters} 
        onClose={() => setShowFilters(false)}
        currentFilters={filters}
        onApply={applyFilters}
      />

      <EquipmentList filters={filters} />
    </section>
  );
};

export default EquipmentPage;