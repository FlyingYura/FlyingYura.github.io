import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    if (currentUser) {
      const unsubscribeCart = onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
        if (doc.exists() && doc.data().cart) {
          setCartCount(doc.data().cart.length);
        } else {
          setCartCount(0);
        }
      });
      return () => unsubscribeCart();
    } else {
      setCartCount(0);
    }
  }, [currentUser]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <ul className={styles.navList}>
          <li className={styles.navLogoItem}>
            <NavLink to="/" end className={({ isActive }) => `${styles.navLogo} ${isActive ? styles.active : ''}`}>
              SubaU
            </NavLink>
          </li>

          <div className={styles.navCenter}>
            <li className={styles.navItem}>
              <NavLink to="/equipment" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                Обладнання
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/payment" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                Оплата
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/contact" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                Контакти
              </NavLink>
            </li>
          </div>

          <div className={styles.authCartContainer}>
            {currentUser ? (
              <div className={styles.authButtons}>
                <NavLink to="/profile" className={styles.authLink}>
                  <FontAwesomeIcon icon={faUser} className={styles.authIcon} />
                  <span className={styles.authText}>Профіль</span>
                </NavLink>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <NavLink to="/login" className={styles.authLink}>
                  <FontAwesomeIcon icon={faSignInAlt} className={styles.authIcon} />
                  <span className={styles.authText}>Увійти</span>
                </NavLink>
                <NavLink to="/register" className={styles.authLink}>
                  <FontAwesomeIcon icon={faUserPlus} className={styles.authIcon} />
                  <span className={styles.authText}>Реєстрація</span>
                </NavLink>
              </div>
            )}
            
            <li className={styles.cartItem}>
              <NavLink to="/rentals" className={({ isActive }) => `${styles.rentalLink} ${isActive ? styles.active : ''}`}>
                <FontAwesomeIcon icon={faShoppingCart} className={`${styles.rentalIcon} ${cartCount > 0 ? styles.activePulse : ''}`} />
                {cartCount > 0 && <span className={styles.cartCounter}>{cartCount}</span>}
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;