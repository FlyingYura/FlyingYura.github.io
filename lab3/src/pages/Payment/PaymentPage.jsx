import styles from './paymentPage.module.css';

const PaymentPage = () => {
  return (
    <div className={styles.paymentForm}>
      <h2 className={styles.title}>Оплата оренди</h2>
      
      <div className={styles.formGroup}>
        <label htmlFor="cardNumber">Номер картки</label>
        <input 
          type="text" 
          id="cardNumber" 
          placeholder="1234 5678 9012 3456" 
          maxLength="19"
        />
      </div>
      
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="expiry">Термін дії</label>
          <input 
            type="text" 
            id="expiry" 
            placeholder="ММ/РР"
            maxLength="5"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="cvv">CVV</label>
          <input 
            type="text" 
            id="cvv" 
            placeholder="123"
            maxLength="3"
          />
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="name">Ім'я на картці</label>
        <input type="text" id="name" />
      </div>
      
      <button className={styles.payButton}>Оплатити</button>
    </div>
  );
};

export default PaymentPage;