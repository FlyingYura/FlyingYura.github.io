import { Link } from 'react-router-dom';
import useLocalStorage from '../../utils/useLocalStorage';
import styles from './rentalsPage.module.css';

const RentalsPage = () => {
  const [rentals, setRentals] = useLocalStorage('rentals', []);

  const handleRemove = (index) => {
    const newRentals = [...rentals];
    newRentals.splice(index, 1);
    setRentals(newRentals);
  };

  return (
    <section id="rentals" className={styles.section}>
      <h2 className={styles.sectionTitle}>Ваші орендовані предмети</h2>
      
      {rentals.length === 0 ? (
        <p className={styles.noRentals}>У вас немає активних оренд.</p>
      ) : (
        <div className={styles.gridContainer}>
          {rentals.map((rental, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemContent}>
                <h3>{rental.name}</h3>
                <p>Кількість днів: {rental.days}</p>
                <p>Загальна ціна: {rental.price} грн</p>
                <p>Період: {rental.startDate} - {rental.endDate}</p>
                <div className={styles.buttonGroup}>
                  <button onClick={() => handleRemove(index)} className={`${styles.rentalButton} ${styles.removeBtn}`}>
                    Видалити
                  </button>
                  <Link to="/payment" className={`${styles.rentalButton} ${styles.payBtn}`}>
                    Оплатити
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RentalsPage;
