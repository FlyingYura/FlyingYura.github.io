import styles from './equipment.module.css';

const EquipmentItem = ({ item, onRentClick }) => {
  return (
    <div className={styles.item} data-price={item.price} data-size={item.size}>
      <img src={item.image} alt={item.name} />
      <div className={styles.itemContent}>
        <h3>{item.name}</h3>
        <p>Ціна: {item.price} грн/день</p>
        <button 
          className={styles.rentButton} 
          onClick={() => onRentClick(item)}
          data-name={item.name}
          data-price={item.price}
        >
          Орендувати
        </button>
      </div>
    </div>
  );
};

export default EquipmentItem;