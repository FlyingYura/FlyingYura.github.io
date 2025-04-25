import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './features.module.css';
import { useIntersectionObserver } from '../../utils/useIntersectionObserver';

const FeatureBlock = ({ title, description, items, image, reverse = false }) => {
  const ref = useIntersectionObserver((target) => {
    target.classList.add(styles.inView);
  }, { threshold: 0.1 });

  return (
    <section ref={ref} className={`${styles.featureBlock} ${reverse ? styles.reverseBlock : ''}`}>
      <div className={styles.featureContainer}>
        <div className={styles.textContent}>
          <h2>{title}</h2>
          <p>{description}</p>
          <ul className={styles.featureList}>
            {items.map((item, index) => (
              <li key={index}>
                <FontAwesomeIcon icon={faCheck} className={styles.featureIcon} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.imageContent}>
          <img src={image} alt={title} loading="lazy" />
        </div>
      </div>
    </section>
  );
};

export default FeatureBlock;