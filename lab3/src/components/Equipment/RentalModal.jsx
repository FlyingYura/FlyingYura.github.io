import { useState, useEffect } from 'react';
import useLocalStorage from '../../utils/useLocalStorage';
import styles from './equipment.module.css';
import { useNavigate } from 'react-router-dom';

const RentalModal = ({ isOpen, item, onClose }) => {
  const [days, setDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [availableCount] = useState(Math.floor(Math.random() * 10) + 1);
  const [rentals, setRentals] = useLocalStorage('rentals', []);
  const [alreadyInCart, setAlreadyInCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (item) {
      setTotalPrice(days * item.price);
      setAlreadyInCart(rentals.some(rental => rental.id === item.id));
    }
  }, [days, item, rentals]);

  const handleDaysChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setDays(value);
  };

  const handleConfirm = () => {
    if (!item || availableCount <= 0 || alreadyInCart) {
      onClose();
      return;
    }

    const newRental = {
      id: item.id,
      name: item.name,
      image: item.image,
      days: days,
      price: totalPrice,
      startDate: new Date().toLocaleDateString(),
      endDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toLocaleDateString()
    };

    setRentals([...rentals, newRental]);
    onClose();
    navigate('/rentals');
  };

  if (!isOpen || !item) return null;

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`}>
      <div className={styles.modal}>
        <button className={styles.closeModal} onClick={onClose}>&times;</button>
        
        <div className={styles.modalHeader}>
          <img src={item.image} alt={item.name} className={styles.modalImage} />
          <div className={styles.modalHeaderText}>
            <h2>{item.name}</h2>
            <p className={styles.itemDescription}>{item.description || 'Відмінний вибір для активного відпочинку'}</p>
            
            {item.features && item.features.length > 0 && (
              <div className={styles.featuresSection}>
                <h3 className={styles.featuresTitle}>Особливості:</h3>
                <ul className={styles.featuresList}>
                  {item.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {alreadyInCart && (
          <div className={styles.warningMessage}>
            Цей товар вже додано до вашого кошика!
          </div>
        )}

        <div className={styles.modalDetails}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Ціна за день:</span>
            <span className={styles.detailValue}>{item.price} грн</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Розмір:</span>
            <span className={styles.detailValue}>
              {item.size === 'small' ? 'Маленький' : 
               item.size === 'medium' ? 'Середній' : 'Великий'}
            </span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Доступно:</span>
            <span className={availableCount > 0 ? styles.inStock : styles.outOfStock}>
              {availableCount > 0 ? `${availableCount} шт.` : 'Немає в наявності'}
            </span>
          </div>
        </div>

        <div className={styles.rentalControls}>
          <label htmlFor="rental-days">Кількість днів:</label>
          <input 
            type="number" 
            id="rental-days" 
            value={days} 
            min="1" 
            onChange={handleDaysChange}
            className={styles.daysInput}
          />
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Загальна ціна:</span>
            <span className={styles.totalPrice}>{totalPrice} грн</span>
          </div>
        </div>

        <button 
          onClick={handleConfirm} 
          className={styles.confirmRental}
          disabled={availableCount <= 0 || alreadyInCart}
        >
          {alreadyInCart ? 'Вже в кошику' : 
           availableCount > 0 ? 'Додати в кошик' : 'Немає в наявності'}
        </button>
      </div>
    </div>
  );
};

export default RentalModal;