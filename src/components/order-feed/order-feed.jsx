import styles from "./order-feed.module.css";
import { useSelector } from "react-redux";
import OrderCard from "../order-card/order-card";

export default function OrderFeed() {

  const orders = useSelector(store => store.feed.orders);

  return (
    <div className={`${styles.orders} custom-scroll`}>
        <ul className={styles.list}>
          {orders && orders.map((order) => (
            <OrderCard order={order} key={order._id} />
          ))}
        </ul>
    </div>
  );
};