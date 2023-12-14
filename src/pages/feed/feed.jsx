import styles from "./feed.module.css"

import data from "../../utils/data"

import OrderFeed from "../../components/order-feed/order-feed"

export default function Feed() {

  return (
    <section className={styles.wrapper}>
      <h1 className="text text_type_main-large pt-10 pb-5">Лента заказов</h1>
      <div className={styles.container}>
        <OrderFeed data={data} />
        <div className={styles.statusbar}>
          <div className={styles.columns}>
            <div>
              <p className="text text_type_main-medium pb-6">Готовы:</p>
              <ul className={styles.stats}>
                {data.length && data.map(order => (
                  <li className="text text_type_digits-default">
                    {order.orderNumber}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text text_type_main-medium pb-6">В работе:</p>
              <ul className={styles.stats}>
                {data.length && data.map(order => (
                  <li className="text text_type_digits-default">
                    {order.orderNumber}
                  </li>
                ))}
              </ul>
            </div>           
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за всё время:</p>
            <p className={`${styles.text_shadow} text text_type_digits-large`}>28752</p>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={`${styles.text_shadow} text text_type_digits-large`}>138</p>
          </div>
        </div>
      </div>
    </section>
    
  )
}