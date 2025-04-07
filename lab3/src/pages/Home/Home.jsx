import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faArrowDown, faShieldAlt, faTruck, faHeadset } from '@fortawesome/free-solid-svg-icons';
import FeatureBlock from '../../components/Features/FeatureBlock';
import Testimonial from '../../components/Testimonials/Testimonial';
import styles from './home.module.css';

const Home = () => {
  return (
    <main className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Готові до незабутньої пригоди?</h1>
          <p className={styles.heroText}>
            Зареєструйтесь сьогодні та отримайте <span>10% знижки</span> на першу оренду спорядження!
          </p>
          <div className={styles.heroButtons}>
            <Link to="/equipment" className={styles.primaryButton}>
              <span>Обрати спорядження</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
            <a href="#about" className={styles.secondaryButton}>
              <span>Дізнатись більше</span>
              <FontAwesomeIcon icon={faArrowDown} />
            </a>
          </div>
          <div className={styles.heroFeatures}>
            {[
              { icon: faShieldAlt, text: "Гарантія якості" },
              { icon: faTruck, text: "Швидка доставка" },
              { icon: faHeadset, text: "Підтримка 24/7" }
            ].map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <FontAwesomeIcon icon={feature.icon} />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>Про наш сервіс</h2>
            <p className={styles.aboutText}>
              Ми надаємо якісне спортивне спорядження для вашого активного відпочинку. У нас ви знайдете все необхідне для кемпінгу, туризму, лижного спорту, велопрогулянок та інших активностей.
            </p>
            <p className={styles.aboutText}>
              Гарантуємо доступні ціни, швидке оформлення оренди та зручні умови повернення спорядження.
            </p>
          </div>
          <div className={styles.aboutImage}>
            <img 
              src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Outdoor Equipment" 
              loading="lazy"
            />
          </div>
        </div>
      </section>

{/* Features Section */}
<section id="features" className={styles.featuresSection}>
  <FeatureBlock 
    title="Професійне обладнання - ваша гарантія безпеки"
    description="Кожен предмет інвентарю проходить 5-етапну перевірку перед видачею."
    items={[
      "Сертифіковані матеріали",
      "Щорічні stress-тести",
      "Повна документація якості"
    ]}
    image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  />

  <FeatureBlock 
    title="Миттєва оренда - більше часу на пригоди"
    description="Наша система онлайн-бронювання дозволяє отримати обладнання швидше."
    items={[
      "Бронювання за 3 кліки",
      "Електронний договір",
      "Миттєве підтвердження"
    ]}
    image="https://images.squarespace-cdn.com/content/v1/60228b2d4248e2593057e4f5/1612878448762-KT4KAT3KPIKG07A4JXU7/iStock-954142740.jpg?format=2500w"
    reverse
  />

  <FeatureBlock 
    title="Доступні ціни - більше можливостей"
    description="Наші клієнти економлять до 40% вартості обладнання."
    items={[
      "Без прихованих платежів",
      "Гнучкі тарифні плани",
      "Знижки постійним клієнтам"
    ]}
    image="https://campspace.com/media/medium/uploads/article/63/60/eb/6360ebaa86860304933255.jpeg"
  />
</section>

      {/* Testimonials Section */}
      <Testimonial />
    </main>
  );
};

export default Home;