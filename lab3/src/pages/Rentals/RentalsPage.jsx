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

  const totalPrice = rentals.reduce((sum, item) => sum + item.price, 0);

  return (
    <section id="rentals" className={styles.section}>
      <h2 className={styles.sectionTitle}>Ваші орендовані предмети</h2>
      
      {rentals.length === 0 ? (
        <p className={styles.noRentals}>У вас немає активних оренд.</p>
      ) : (
        <div className={styles.pageLayout}>
          <div className={styles.rentalList}>
            {rentals.map((rental, index) => (
              <div key={index} className={styles.rentalItem}>
                <div className={styles.itemImage}>
                  <img src={rental.image} alt={rental.name} />
                </div>
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemTitle}>{rental.name}</h3>
                  <p className={styles.itemSeller}>SubaU</p>
                  <div className={styles.priceInfo}>
                    <span className={styles.currentPrice}>{rental.price} грн</span>
                  </div>
                  <div className={styles.rentalPeriod}>
                    <span>Період оренди:</span>
                    <span>{rental.startDate} - {rental.endDate}</span>
                  </div>
                  <div className={styles.quantityControl}>
                    <span>Кількість днів: {rental.days}</span>
                  </div>
                </div>
                <div className={styles.itemActions}>
                  <button 
                    onClick={() => handleRemove(index)} 
                    className={styles.removeBtn}
                  >
                    Видалити
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.orderSummary}>
            <h3 className={styles.summaryTitle}>До оплати</h3>
            <div className={styles.summaryItems}>
              {rentals.map((rental, index) => (
                <div key={index} className={styles.summaryItem}>
                  <span className={styles.summaryItemName}>{rental.name}</span>
                  <span className={styles.summaryItemPrice}>{rental.price} грн</span>
                </div>
              ))}
            </div>
            <div className={styles.summaryTotal}>
              <div className={styles.totalRow}>
                <span>Сума:</span>
                <span>{totalPrice} грн</span>
              </div>
            </div>
            <Link 
              to="/payment" 
              className={styles.checkoutButton}
              state={{ rentals }}
            >
              Оплатити
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default RentalsPage;