import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useMemo } from "react";
import { ThreeDots } from 'react-loader-spinner';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "../../hooks";
import { getOrder } from "../../services/actions/order";
import styles from "./order-info.module.css";
import { TIngredient, TOrder } from "../../services/types/data";

const OrderInfo: FC = () => {

  const { order, orderRequest, orderRequestFailed } = useSelector(store => store.order)

  const { ingredients } = useSelector(store => store.ingredients);

  const { orderNumber } = useParams();

  const dispatch = useDispatch()
  // Получаем иформацию об ингредиенте по айди
  const getIngredient = (id: string) => ingredients.find(item => item._id === id);
  // Получаем информацию обо всех ингредиентах текущего заказа
  const orderIngredients = order?.ingredients?.map(getIngredient);
  // Получаем массив из неповторяющихся ингредиентов
  const currentOrder = ingredients?.filter((item) => order?.ingredients.includes(item._id));

  const counter = (ingredient: TIngredient) => {
    let count = orderIngredients?.filter((item: TIngredient) => ingredient._id === item._id).length

    if (ingredient.type === "bun") {
      count = count * 2
    }
    return count
  };

  const totalPrice = useMemo(() => orderIngredients?.reduce((acc: number, item: TIngredient) => {
    if (item) {
      if (item.type === "bun") {
        return acc + (item.price * 2)
      }
      return acc + item.price
    }
    return acc
  }, 0), [orderIngredients]);

  const orderStatus = (order: TOrder) => {
    switch (order.status) {
      case "done": return "Выполнен"
      case "pending": return "Готовится"
      case "created": return "Создан"
      default: return order.status
    }
  };

  const readiness = order?.status === "done" ? "text_color_status_done" : "";

  useEffect(() => {
    dispatch(getOrder(orderNumber));
  }, [orderNumber]);

  return (
    <>
      {orderRequest || orderRequestFailed ? (<ThreeDots />) : order && (
        <div className={styles.wrapper}>
          <p className="text text_type_digits-default pb-10">{`#${orderNumber}`}</p>
          <p className="text text_type_main-medium pb-3">{order.name}</p>
          <p className={`${readiness} text text_type_main-small pb-15`}>{orderStatus(order)}</p>
          <p className="text text_type_main-medium pb-6">Состав:</p>
          <ul className={`${styles.list} custom-scroll`}>
            {currentOrder && currentOrder.map(ingredient => (
              <li className={styles.ingredient} key={ingredient._id}>
                <div className={styles.border}>
                  <img className={styles.image} src={ingredient.image} alt="Ингредиент" />
                </div>
                <p className="text text_type_main-default">{ingredient.name}</p>
                <div className={styles.price}>
                  <p className="text text_type_digits-default">{`${counter(ingredient)} x ${ingredient.price}`}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.info}>
            <FormattedDate date={new Date(order.createdAt)} className="text text_type_main-default text_color_inactive" />
            <div className={styles.price}>
              <p className="text text_type_digits-default">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderInfo;