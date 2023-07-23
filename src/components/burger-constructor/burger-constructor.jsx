import PropTypes from "prop-types";
import {useState, useContext, useMemo} from 'react';
import styles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { BurgerContext } from "../../utils/burger-context";
import request from "../../utils/api";

export default function BurgerConstructor() {
  const selectedIngredients = useContext(BurgerContext);
  const { bun, ingredients } = selectedIngredients;
  const [order, setOrder] = useState(false);

  const [state, setState] = useState({
    orderNumber: null,
    loading: true,
    isError: true
  })

  const ingredientIds = useMemo(() => {
    return ingredients.map(item => item._id).concat(bun._id)
  }, [selectedIngredients.bun, selectedIngredients.ingredients])

  const onOpen = () => {
    const getOrderDetails = async () => {
      setState({...state, loading: true})
      try {
        request('/orders', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({
            "ingredients": ingredientIds
          })
        })
        .then((data) => setState({...state, orderNumber: data.order.number, loading: false, isError: false}))
        .then(() => setOrder(true))
      } catch(err) {
        setState({...state, isError: true})
        console.log(`Ошибка ${err}`)
      }
    }
    getOrderDetails()
  }

  const onClose = () => {
    setOrder(false)
  }
   
  const totalPrice = useMemo(() => {
    return (bun.price ? bun.price*2 : 0) + ingredients.reduce((acc, item) => acc + item.price, 0)
  }, [selectedIngredients])

  return (
    <section className={`${styles.section} mt-25 mr-2`}>
      {totalPrice === 0 && 
        <h2 className="text text_type_main-large mt-10">Нажмите на ингредиент, откроется его описание и он появится в списке</h2>
      }
     <ul className={styles.list}>
      {bun.name && 
        <li className="ml-8 mr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
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
          <OrderDetails orderNumber={state.orderNumber}/>
        </Modal>
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.object
}