import styles from "./feed.module.css"

import OrderFeed from "../../components/order-feed/order-feed"
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

import { connect, disconnect } from "../../services/actions/feed";
import { useEffect } from "react";
import { wsUrl } from "../../utils/ws-status";

export default function Feed() {

  const dispatch = useDispatch();

  const { orders, total, totalToday, isLoading } = useSelector(store => store.feed);

  useEffect(() => {
    dispatch(connect(wsUrl));
    return () => {
      dispatch(disconnect());
    }
  }, []);

  return (
    <section className={styles.wrapper}>
      <h1 className="text text_type_main-large pt-10 pb-5">Лента заказов</h1>
      <div className={styles.container}>
        {isLoading ? (<ThreeDots />) : <OrderFeed />}
        <div className={styles.statusbar}>
          <div className={styles.columns}>
            <div>
              <p className="text text_type_main-medium pb-6">Готовы:</p>
              <div className={styles.stats}>
                {orders && orders.splice(0, 20).map(order => (
                  <li className="text text_type_digits-default text_color_status_done" key={order._id}>
                    {order.status === "done" ? order.number : null}
                  </li>
                ))}
              </div>
            </div>
            <div>
              <p className="text text_type_main-medium pb-6">В работе:</p>
              <ul className={styles.stats}>
                {orders && orders.splice(0, 10).map(order => (
                  <li className="text text_type_digits-default" key={order._id}>
                    {order.status === "pending" ? order.orderNumber : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за всё время:</p>
            <p className={`${styles.text_shadow} text text_type_digits-large`}>{total}</p>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={`${styles.text_shadow} text text_type_digits-large`}>{totalToday}</p>
          </div>
        </div>
      </div>
    </section>
  )
}