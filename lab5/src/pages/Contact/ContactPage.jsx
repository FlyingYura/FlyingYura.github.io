import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './contactPage.module.css';

const ContactPage = () => {
  return (
    <section className={styles.contactSection}>
      <h1 className={styles.title}>Контакти</h1>
      
      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.contactIcon} />
          <h3>Адреса</h3>
          <p>м. Львів, вул. Зелена, 15</p>
        </div>
        
        <div className={styles.contactItem}>
          <FontAwesomeIcon icon={faPhone} className={styles.contactIcon} />
          <h3>Телефон</h3>
          <p><a href="tel:+380980986653">+38 (098) 098-66-53</a></p>
        </div>
        
        <div className={styles.contactItem}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
          <h3>Email</h3>
          <p>yurii.prokopiv.oi.2023@lpnu.ua</p>
        </div>
      </div>

      <div className={styles.contactForm}>
        <h2 className={styles.formTitle}>Напишіть нам</h2>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="name">Ваше ім'я</label>
            <input type="text" id="name" required />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message">Повідомлення</label>
            <textarea id="message" rows="5" required></textarea>
          </div>
          
          <button type="submit" className={styles.submitButton}>Надіслати</button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;