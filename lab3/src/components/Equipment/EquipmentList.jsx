import { useState } from 'react';
import EquipmentItem from './EquipmentItem';
import RentalModal from './RentalModal';
import styles from './equipment.module.css';

const equipmentData = [
  { 
    id: 1, 
    name: 'Велосипед', 
    price: 150, 
    size: 'medium', 
    image: 'https://listnride.s3.eu-central-1.amazonaws.com/uploads/ride_image/image_file/99493/thumb_lsp1.jpg',
    description: "Велосипед для їзди по місту з алюмінієвою рамою, 21 швидкість, амортизаційна вилка",
    features: ['Дискові гальма', 'Підвіска: 100мм', 'Вага 14.5кг', 'Розмір колес 29"'],
    category: 'cycling'
  },
  { 
    id: 2, 
    name: 'Лижі', 
    price: 450, 
    size: 'medium', 
    image: 'https://www.skirentalsbluemountain.com/cdn/shop/files/Ski_Rental_Mountainside_Sports.jpg?v=1706271578',
    description: "Лижі для фрірайду з кріпленнями, ідеальні для сніжних трас",
    features: ['Довжина: 170см', 'Ширина: 98мм', 'Кріплення Salomon Sth2', 'Вага 3.8кг'],
    category: 'winter'
  },
  { 
    id: 3, 
    name: 'Каяк', 
    price: 600, 
    size: 'large', 
    image: 'https://orbitreki.com.ua/image/cache/catalog/%D0%9A%D0%B0%D1%8F%D0%BA/%D0%9A%D0%B0%D1%8F%D0%BA%20SeaFlo%20SF-1010%20yellow/SeaFlo%20SF-1010%20yellow%20(1)-550x550.jpg',
    description: "Стабільний каяк для початківців та досвідчених веслярів",
    features: ['Довжина: 3.2м', 'Вантажопідйомність: 120кг', 'Вага: 22кг', '3 герметичні відсіки'],
    category: 'water'
  },
  { 
    id: 4, 
    name: 'Роликові Ковзани', 
    price: 150, 
    size: 'small', 
    image: 'https://cdn.shopify.com/s/files/1/0557/5239/2813/files/How_to_Hire_Rollerblades_and_Roller_Skates_in_London_Boots.jpg?v=1718144375',
    description: "Комфортні ролики для міської їзди з м'якими вставками та хорошими роликами",
    features: ['Колеса 80мм 85A', 'Алюмінієва рама', 'Швидкісні підшипники ABEC-7'],
    category: 'urban'
  },
  { 
    id: 5, 
    name: 'Скейтборд', 
    price: 100, 
    size: 'small', 
    image: 'https://media.istockphoto.com/id/172178479/photo/skateboard.jpg?s=612x612&w=0&k=20&c=P07bl1ZvmOS7N6ezRjkN_pJBl5TF3vkbYRf9tsUJS1c=',
    description: "Класичний  скейтборд",
    features: ['Довжина: 22"', 'Ширина: 6"', 'Колеса: 59мм', 'Підшипники ABEC-5'],
    category: 'urban'
  },
  { 
    id: 6, 
    name: 'Набір для гольфу', 
    price: 800, 
    size: 'large', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrf60353Khi5cSe6bSywyMLmxIMsgbhrH7A&s',
    description: "Повний комплект ключок для гольфу у переносній сумці",
    features: ['9 ключок', 'Сумка на колесах', 'Карбонові рукоятки', 'Технічний паспорт'],
    category: 'golf'
  },
  { 
    id: 7, 
    name: 'Ковзани', 
    price: 300, 
    size: 'medium', 
    image: 'https://americanathleticshoe.com/cdn/shop/products/2_18e3f34b-7b0b-410c-b184-1b2563c87384_1200x1200.jpg?v=1620423515',
    description: "Ковзани для катання на льоді",
    features: ['Легка композитна рама', 'Термоформування', 'Лезо з нержавіючої сталі'],
    category: 'winter'
  },
  { 
    id: 8, 
    name: 'Футбольний м\'яч', 
    price: 50, 
    size: 'medium', 
    image: 'https://media.istockphoto.com/id/610241662/photo/soccer-ball-isolated-on-the-white-background.jpg?s=612x612&w=0&k=20&c=f7EWJti8x_JFmDxA8CMJvi1ulMlPjTdDP69HBWy9Hb4=',
    description: "М'яч для футболу, розмір ...",
    features: ['Синтетична шкіра', 'Бутилова камера', 'Вага: 450г', 'Круглість: ±0.2%'],
    category: 'team'
  },
  { 
    id: 9, 
    name: 'Набір тенісних ракеток', 
    price: 350, 
    size: 'medium', 
    image: 'https://t4.ftcdn.net/jpg/04/29/15/09/360_F_429150981_1tFlQvD4mEFMKWvE2JSA3kICppfv0yUr.jpg',
    description: "Професійний комплект з 2 ракеток для гри в теніс",
    features: ['Вага: 300г', 'Площа струн: 645см²', 'Карбонове волокно', 'Комплект м\'чів'],
    category: 'tennis'
  },
  { 
    id: 10, 
    name: 'Сноуборд', 
    price: 550, 
    size: 'large', 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj77X4KuU2BgNaneeXHpN83JIlY4absVUl2g&s',
    description: "Сноуборд для фрірайдингу для досвідчених райдерів",
    features: ['Довжина: 158см', 'Ширина: 25.5см', 'Гібридний прогин', 'Вага: 3.2кг'],
    category: 'winter'
  },
];

const EquipmentList = ({ filters }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredItems = equipmentData.filter(item => {
    const priceMatch = item.price <= filters.price;
    const sizeMatch = filters.size === 'all' || item.size === filters.size;
    const categoryMatch = filters.category === 'all' || item.category === filters.category;
    return priceMatch && sizeMatch && categoryMatch;
  });

  const handleRentClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <div className={styles.gridContainer}>
      {filteredItems.length > 0 ? (
        filteredItems.map(item => (
          <EquipmentItem 
            key={item.id}
            item={item}
            onRentClick={handleRentClick}
          />
        ))
      ) : (
        <div className={styles.noResults}>
          <h3>Не знайдено спорядження за обраними фільтрами</h3>
          <p>Спробуйте змінити параметри пошуку</p>
        </div>
      )}

      <RentalModal 
        isOpen={showModal}
        item={selectedItem}
        onClose={closeModal}
      />
    </div>
  );
};

export default EquipmentList;