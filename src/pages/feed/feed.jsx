import styles from "./feed.module.css"

import OrderFeed from "../../components/order-feed/order-feed"

export default function Feed() {
  const data = [
    {
      orderNumber: '034533',
      timestamp: '2022-10-10T17:33:32.877Z',
      name: 'Death Star Starship',
      price: 360,
      ingredients: ["https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png",
      "https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png",
      "https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png",
      "https://code.s3.yandex.net/react/code/meat-04.png"],
      status: "Готов"
    },
    {
      orderNumber: '034533',
      timestamp: '2022-10-10T17:33:32.877Z',
      name: 'Death Star Starship',
      price: 360,
      ingredients: ["https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png",
      "https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png",
      "https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png"]
    },
    {
      orderNumber: '034533',
      timestamp: '2022-10-10T17:33:32.877Z',
      name: 'Death Star Starship',
      price: 360,
      ingredients: ["https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png",
      "https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png",
      "https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png"]
    },
    {
      orderNumber: '034533',
      timestamp: '2022-10-10T17:33:32.877Z',
      name: 'Death Star Starship',
      price: 360,
      ingredients: ["https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png",
      "https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png",
      "https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png"]
    },
   {
      orderNumber: '034533',
      timestamp: '2022-10-10T17:33:32.877Z',
      name: 'Death Star Starship',
      price: 360,
      ingredients: ["https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png",
      "https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png",
      "https://code.s3.yandex.net/react/code/bun-02.png",
      "https://code.s3.yandex.net/react/code/meat-04.png"]
    }
  ]

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