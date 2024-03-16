import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "../../hooks";
import { TOrder } from "../../services/types/data";
import styles from "./order-card.module.css";

const OrderCard: FC<{ order: TOrder }> = ({ order }) => {

  const location = useLocation();

  const ingredients = useSelector(store => store.ingredients.ingredients);

  const getIngredient = (id: string) => ingredients.find(item => item._id === id)
  const currentIngredients = order?.ingredients.map((item) => getIngredient(item));
  const orderIngredients = useMemo(() => ingredients.filter((item) => order.ingredients.includes(item._id)), [ingredients, order]);

  const totalPrice = useMemo(() => currentIngredients.reduce((acc, item) => {
    if (item) {
      if (item.type === "bun") {
        return acc + item.price * 2
      }
      return acc + item.price
    }
    return acc
  }, 0), [currentIngredients]);

  const checkOrderStatus = () => {
    switch (order.status) {
      case "done": return "Выполнен"
      case "pending": return "Готовится"
      case "create": return "Создан"
      default: return ""
    };
  };

  const readiness = order?.status === "done" ? "text_color_status_done" : null;

  return (
    <Link to={{ pathname: `${location.pathname}/${order.number}` }} state={{ background: location }} className="link">
      <li className={styles.card}>
        <div className={styles.details}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>
          <FormattedDate date={new Date(order.createdAt)} className="text text_type_main-default text_color_inactive" />
        </div>
        <div>
          <p className="text text_type_main-medium">{order.name}</p>
          {location.pathname !== '/feed' &&
            <p className={`${readiness} text text_type_main-default pt-2`}>{checkOrderStatus()}</p>
          }
        </div>
        <div className={styles.info}>
          <ul className={styles.ingredients}>
            {orderIngredients && orderIngredients.slice(0, 6).map(item => (
              <li className={styles.ingredient} key={item._id}>
                <img src={item.image} alt="Ингредиент" className={styles.image} />
              </li>
            ))}
            {orderIngredients.length > 6 && (
              <div className={`${styles.excess} text text_type_digits-default`}>
                {`+${orderIngredients.length - 6}`}
              </div>
            )}
          </ul>
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </Link>
  )
};

export default OrderCard;
