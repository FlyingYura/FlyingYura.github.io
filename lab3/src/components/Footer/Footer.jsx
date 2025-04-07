import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>SUBAU</div>
        <div className={styles.copyright}>© 2025 SUBAU. Усі права захищені.</div>
      </div>
    </footer>
  );
};

export default Footer;