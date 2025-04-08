import { useInView } from 'react-intersection-observer';
import styles from './testimonials.module.css';

const testimonials = [
  {
    text: '"Найкраще обладнання, яке я коли-небудь орендовувала! Це було чудово!"',
    author: 'Олена, Київ'
  },
  {
    text: '"Оренда пройшла дуже швидко, і я отримав все необхідне для моїх подорожей."',
    author: 'Максим, Львів'
  }
];

const Testimonial = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,  
    threshold: 0.3,    
  });

  return (
    <section className={`${styles.testimonial} ${inView ? styles.inView : ''}`} ref={ref}>
      <h2>Що говорять наші клієнти</h2>
      <div className={styles.testimonialContainer}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={`${styles.testimonialItem} ${inView ? styles.inView : ''}`}>
            <p>{testimonial.text}</p>
            <h4>{testimonial.author}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
