import { useState } from 'react';
import styles from './Auth.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AuthForm = ({ onSubmit, isLogin, showConfirmPassword = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showConfirmPassword || password === confirmPassword) {
      onSubmit(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <h2>{isLogin ? 'Увійти' : 'Реєстрація'}</h2>

      <div className={styles.formGroup}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Пароль</label>
        <div className={styles.passwordInput}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={styles.showPasswordBtn}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
      </div>

      {showConfirmPassword && (
        <div className={styles.formGroup}>
          <label>Підтвердити пароль</label>
          <div className={styles.passwordInput}>
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Підтвердити пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
      )}

      <button type="submit" className={styles.submitBtn}>
        {isLogin ? 'Увійти' : 'Зареєструватись'}
      </button>
    </form>
  );
};

export default AuthForm;
