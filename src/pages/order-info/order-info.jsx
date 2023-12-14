import styles from "./order-info.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

import data from "../../utils/data";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";

export default function OrderInfo () {
  const [order, setOrder] = useState({})

  const { number } = useParams();

  const loadOrderInfo = useCallback(
    () => {
      const currentOrder = data.find(({orderNumber}) => orderNumber === number);
      setOrder(currentOrder);
    }, [number]
    );

  useEffect(
    () => {
      loadOrderInfo();
    },
    [number, loadOrderInfo]
  );

  return (
    <div className={styles.wrapper}>
      <p className="text text_type_digits-default pb-10">{`#${order.orderNumber}`}</p>
      <p className="text text_type_main-medium pb-3">{`${order.name} бургер`}</p>
      <p className="text text_type_main-small pb-15">{order.status}</p>
      <p className="text text_type_main-medium pb-6">Состав:</p>
      <ul className={`${styles.list} custom-scroll`}>
        {order.ingredients && order.ingredients.map(ingredient => (
          <li className={styles.ingredient}>
            <div className={styles.border}>
              <img className={styles.image} src={ingredient.img} alt="Ингредиент" />
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
            <div className={styles.price}>
              <p className="text text_type_digits-default">{`${ingredient.count} x ${ingredient.price}`}</p>
              <CurrencyIcon />
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.info}>
        <FormattedDate date={new Date(order.timestamp)} className="text text_type_main-default text_color_inactive" />
        <div className={styles.price}>
          <p className="text text_type_digits-default">{order.price}</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  )
}
