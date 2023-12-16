import styles from "./order-feed.module.css";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from 'react-router-dom';

import data from "../../utils/data";

export default function OrderFeed() {
  
  const location = useLocation();

  return (
    <div className={`${styles.orders} custom-scroll`}>
      <ul className={styles.list}>
        {data.length && data.map((data) => (
          <Link to={{pathname: `${location.pathname}/${data.orderNumber}`}} state={{background: location}}  className="link">
            <li className={styles.card}>
              <div className={styles.order}>
                <p className="text text_type_digits-default">{`#${data.orderNumber}`}</p>
                <FormattedDate date={new Date(data.timestamp)} className="text text_type_main-default text_color_inactive"/>
              </div>
              <div>
                <p className="text text_type_main-medium">{`${data.name} бургер`}</p>
                {location.pathname !== '/feed' && 
                <p className="text text_type_main-default pt-2">{data.status}</p>
                }
              </div>
              <div className={styles.info}>
                <ul className={styles.ingredients}>
                  {data.ingredients && data.ingredients.slice(0, 6).map(ingredient => (
                    <li className={styles.ingredient}> 
                      <img src={ingredient.img} alt="Ингредиент" className={styles.image}/>    
                    </li>
                  ))}
                </ul>
                <div className={styles.price}>
                  <p className="text text_type_digits-default mr-2">{data.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          </Link>    
        ))}
      </ul>
    </div>
  )
}