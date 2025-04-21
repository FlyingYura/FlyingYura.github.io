import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import styles from './Profile.module.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setEmail(user.email || '');
          setName(user.displayName?.split(' ')[0] || '');
          setSurname(user.displayName?.split(' ')[1] || '');
          setPhotoURL(user.photoURL || '');

          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setPhone(data.phone || '');
          }
        }
      } catch (err) {
        setError('Помилка завантаження даних');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, {
          displayName: `${name} ${surname}`,
          photoURL: photoURL
        });

        await updateDoc(doc(db, 'users', user.uid), {
          name,
          surname,
          phone,
          email: user.email,
          photoURL
        });

        setSuccess('Дані успішно збережено!');
      }
    } catch (err) {
      setError('Помилка збереження даних: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (err) {
      setError('Помилка виходу: ' + err.message);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
      
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setPhotoURL(url);
      } catch (err) {
        setError('Не вдалося завантажити фото');
      }
    }
  };

  if (loading) {
    return <div className={styles.loading}>Завантаження...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <h2 className={styles.profileTitle}>Мій профіль</h2>
        
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <form onSubmit={handleSave} className={styles.profileForm}>
          <div className={styles.avatarContainer}>
            <label htmlFor="avatar" className={styles.avatarLabel}>
              <div className={styles.avatarWrapper}>
                {photoURL ? (
                  <img src={photoURL} alt="Аватар" className={styles.avatar} />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <FontAwesomeIcon icon={faUser} size="3x" />
                  </div>
                )}
                <div className={styles.avatarOverlay}>Змінити фото</div>
              </div>
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.avatarInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name">Ім'я</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="surname">Прізвище</label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Номер телефону</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className={styles.saveBtn}>
            {loading ? 'Збереження...' : 'Зберегти зміни'}
          </button>
        </form>

        <button onClick={handleSignOut} className={styles.logoutBtn}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Вийти
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;