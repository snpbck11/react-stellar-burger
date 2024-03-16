import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "../../hooks/index";
import { addBun, addIngredient, deleteInredient, swapIngredient } from "../../services/actions/burger-constructor";
import { closeOrder, getOrderDetails, showOrder } from "../../services/actions/order-details";
import { TIngredient } from "../../services/types/data";
import DraggableIngredient from "../draggable-ingredient/draggable-ingredient";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";

const BurgerConstructor: FC = () => {
  const { bun, ingredients } = useSelector(state => state.burgerConstructor);
  const { orderNumber, isLoading, isOpen } = useSelector(state => state.orderDetails);

  const user = useSelector(state => state.user.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [, dropRef] = useDrop({
    accept: "ingredients",
    drop(item: TIngredient) {
      onDropHandler(item);
    }
  });

  const onDropHandler = (item: TIngredient) => {
    item.type === "bun" ? dispatch(addBun(item)) : dispatch(addIngredient(item));
  };

  const ingredientIds = useMemo(() => {
    if (bun) {
      return [...ingredients.map(item => item._id), bun._id]
    }
  }, [bun, ingredients]);

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

  const handleDeleteIngredient = (ingredient: TIngredient) => {
    dispatch(deleteInredient(ingredient));
  };

  const totalPrice = useMemo(() => {
    if (bun) {
      return (bun.price ? bun.price * 2 : 0) + ingredients.reduce((acc, item) => acc + item.price, 0)
    }
  }, [bun, ingredients]);

  const disabled = !bun;

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    const dragIngredient = ingredients[dragIndex]
    const newIngredients = [...ingredients]
    newIngredients.splice(dragIndex, 1)
    newIngredients.splice(hoverIndex, 0, dragIngredient);
    dispatch(swapIngredient(newIngredients));
  };

  return (
    <section ref={dropRef} className={`${styles.section} pt-25 pr-2`}>
      {totalPrice === 0 &&
        <h2 className="text text_type_main-large mt-10">Перетащите ингредиенты сюда</h2>
      }
      <ul className={styles.container}>
        {bun &&
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
        {bun &&
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
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={onOpen} disabled={disabled}>Оформить заказ</Button>
        </div>
      )
      }
      {isOpen &&
        <Modal onClose={onClose}>
          <OrderDetails orderNumber={orderNumber} loader={isLoading} />
        </Modal>
      }
    </section>
  );
};

export default BurgerConstructor;