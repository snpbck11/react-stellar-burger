import styles from "./order-feed.module.css";
import OrderCard from "../order-card/order-card";
import PropTypes from "prop-types";

export default function OrderFeed({orders}) {

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

OrderFeed.propTypes = {
  orders: PropTypes.array
}