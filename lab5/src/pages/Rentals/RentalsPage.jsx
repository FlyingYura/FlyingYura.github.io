import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import styles from './rentalsPage.module.css';

const RentalsPage = () => {
  const [user] = useAuthState(auth);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().cart) {
          setRentals(userDoc.data().cart);
        }
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const handleRemove = async (index) => {
    if (!user) return;
    
    const newRentals = [...rentals];
    newRentals.splice(index, 1);
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        cart: newRentals
      });
      setRentals(newRentals);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const totalPrice = rentals.reduce((sum, item) => sum + item.price, 0);

  if (!user) {
    return (
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Будь ласка, увійдіть в систему</h2>
        <p className={styles.noRentals}>
          Щоб додавати товари до кошика, вам потрібно{' '}
          <Link to="/login" className={styles.authLink}>увійти</Link> або{' '}
          <Link to="/register" className={styles.authLink}>зареєструватися</Link>.
        </p>
      </section>
    );
  }

  if (loading) {
    return <div className={styles.loading}>Завантаження кошика...</div>;
  }

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