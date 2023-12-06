import styles from "./order-feed.module.css";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderFeed({data}) {

  return (
    <div className={`${styles.orders} custom-scroll`}>
      <ul className={styles.list}>
        {data.length && data.map(order => (
          <li className={styles.card}>
          <div className={styles.order}>
            <p className="text text_type_digits-default">{`#${order.orderNumber}`}</p>
            <FormattedDate date={new Date(order.timestamp)} className="text text_type_main-default text_color_inactive"/>
          </div>
          <div>
            <p className="text text_type_main-medium">{`${order.name} бургер`}</p>
            {order.status && 
            <p className="text text_type_main-default pt-2">{order.status}</p>
            }
          </div>
          <div className={styles.info}>
            <ul className={styles.ingredients}>
              {order.ingredients && order.ingredients.slice(0, 6).map(ingredient => (
                <li className={styles.ingredient}> 
                  <img src={ingredient} alt="Ингредиент" className={styles.image}/>    
                </li>
              ))}
            </ul>
            <div className={styles.price}>
              <p className="text text_type_digits-default mr-2">{order.price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </li>    
        ))}
      </ul>
    </div>
  )
}