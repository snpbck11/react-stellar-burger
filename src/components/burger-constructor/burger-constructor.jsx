import { useMemo } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getOrderDetails } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { addBun, addIngredient, deleteInredient, swapInredient } from "../../services/actions/burger-constructor";
import { useDrop } from "react-dnd";
import { closeOrder, showOrder } from "../../services/actions/order-details";
import { useNavigate } from "react-router";

export default function BurgerConstructor() {
  const { bun, ingredients } = useSelector(state => state.burgerConstructor);
  const { orderNumber, isLoading, isOpen } = useSelector(state => state.orderDetails);

  const user = useSelector(state => state.user.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [, dropRef] = useDrop({
    accept: "ingredients",
    drop(item) {
      onDropHandler(item);
    }
  });

  const onDropHandler = (item) => {
    item.type === "bun" ? dispatch(addBun(item)) : dispatch(addIngredient(item));
  }

  const ingredientIds = useMemo(() => {
    return [...ingredients.map(item => item._id), bun._id]
  }, [bun, ingredients])

  const onOpen = () => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(showOrder());
      dispatch(getOrderDetails(ingredientIds));  
    }
  };

  const onClose = () => {
    dispatch(closeOrder());
  };

  const handleDeleteIngredient = (ingredient) => {
    dispatch(deleteInredient(ingredient));
  };
   
  const totalPrice = useMemo(() => {
    return (bun.price ? bun.price*2 : 0) + ingredients.reduce((acc, item) => acc + item.price, 0)
  }, [bun, ingredients]);

  const disabled = !bun._id;

  const moveIngredient = (dragIndex, hoverIndex) => {
    const dragIngredient = ingredients[dragIndex]
    const newIngredients = [...ingredients]
    newIngredients.splice(dragIndex, 1)
    newIngredients.splice(hoverIndex, 0, dragIngredient);
    dispatch(swapInredient(newIngredients));
 }

  return (
    <section ref={dropRef} className={`${styles.section} pt-25 pr-2`}>
      {totalPrice === 0 && 
        <h2 className="text text_type_main-large mt-10">Перетащите ингредиенты сюда</h2>
      }
     <ul className={styles.container}>
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
          <ul className={`${styles.list} custom-scroll`}>
          {ingredients.map((ingredient, index) => (
            <DraggableIngredient key={ingredient.uniqueId} id={ingredient.uniqueId} ingredient={ingredient} index={index} handleDeleteIngredient={handleDeleteIngredient} moveIngredient={moveIngredient} />
           ))
          }
          </ul>
        </li>
        {bun.name && 
          <li className="ml-8 mr-2">
            <ConstructorElement 
              type="bottom"        
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
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
          <Button htmlType="button" type="primary" size="large" onClick={onOpen} disabled={disabled}>Оформить заказ</Button>
        </div>
        )
      }
      {isOpen && 
        <Modal onClose={onClose}>
          <OrderDetails orderNumber={orderNumber} loader={isLoading}/>
        </Modal>
      }
    </section>
  )
}