import PropTypes from "prop-types";
import {useState} from 'react';
import styles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

export default function BurgerConstructor({selectedIngredients}) {

  const [order, setOrder] = useState(false)

  const onOpen = () => {
    setOrder(true)
  }

  const onClose = () => {
    setOrder(false)
  }
   
  const totalPrice = selectedIngredients.bun.price*2 + selectedIngredients.ingredients.reduce((acc, item) => acc + item.price, 0)

  return (
    <section className={`${styles.section} mt-25 mr-2`}>
      {totalPrice === 0 && 
        <h2 className="text text_type_main-large mt-10">Нажмите на ингредиент, откроется его описание и он появится в списке</h2>
      }
     <ul className={styles.list}>
      {selectedIngredients.bun.name && 
        <li className="ml-8 mr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedIngredients.bun.name} (верх)`}
            price={selectedIngredients.bun.price}
            thumbnail={selectedIngredients.bun.image}
           />
        </li>
      }
        <li>
          <ul className={`${styles.list} custom-scroll`} style={{maxHeight: 'calc(100vh - 500px)',
  overflowY: 'auto'}}>
          {selectedIngredients.ingredients.map((item, index) => (
            <li key={index} className={`${styles.element} pr-4`}>
              <DragIcon />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
            ))
          }      
          </ul>
        </li>
        {selectedIngredients.bun.name && 
          <li className="ml-8 mr-2">
            <ConstructorElement 
              type="bottom"        
              isLocked={true}
              text={`${selectedIngredients.bun.name} (низ)`}
              price={selectedIngredients.bun.price}
              thumbnail={selectedIngredients.bun.image}
            />
          </li>
        }
      </ul>
      {totalPrice !== 0 && (
        <div className={`${styles.order} pt-10 pr-4`}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon />
        </div>
          <Button htmlType="button" type="primary" size="large" onClick={onOpen}>Оформить заказ</Button>
        </div>
        )
      }
      {order && 
        <Modal onClose={onClose}>
          <OrderDetails />
        </Modal>
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.object
}