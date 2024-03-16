import { FC } from "react";
import OrderCard from "../order-card/order-card";
import styles from "./order-feed.module.css";
import { TOrder } from "../../services/types/data";

const OrderFeed: FC<{orders: ReadonlyArray<TOrder>}> = ({ orders }) => {

  return (
    <div className={`${styles.orders} custom-scroll`}>
      {orders &&
        <ul className={styles.list}>
          {orders && orders?.map((order) => (
            <OrderCard order={order} key={order._id} />))
          }
        </ul>
      }
    </div>
  );
};

export default OrderFeed;