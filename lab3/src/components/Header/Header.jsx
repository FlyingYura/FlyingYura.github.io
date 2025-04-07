import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import useLocalStorage from '../../utils/useLocalStorage';
import styles from './Header.module.css';

const Header = () => {
  const [rentals] = useLocalStorage('rentals', []);

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <ul className={styles.navList}>
          {/* Логотип - лівий край */}
          <li className={styles.navLogoItem}>
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => 
                `${styles.navLogo} ${isActive ? styles.active : ''}`
              }
            >
              SubaU
            </NavLink>
          </li>

          {/* Центральна навігація */}
          <div className={styles.navCenter}>
            <li className={styles.navItem}>
              <NavLink 
                to="/equipment" 
                className={({ isActive }) => 
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                Обладнання
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
                to="/payment" 
                className={({ isActive }) => 
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                Оплата
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                Контакти
              </NavLink>
            </li>
          </div>

          {/* Кошик - правий край */}
          <li className={styles.cartItem}>
            <NavLink 
              to="/rentals" 
              className={({ isActive }) => 
                `${styles.rentalLink} ${isActive ? styles.active : ''}`
              }
            >
              <FontAwesomeIcon 
                icon={faShoppingCart} 
                className={`${styles.rentalIcon} ${rentals.length > 0 ? styles.activePulse : ''}`} 
              />
              {rentals.length > 0 && (
                <span className={styles.cartCounter}>{rentals.length}</span>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;