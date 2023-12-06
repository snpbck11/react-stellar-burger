import styles from "./order-info.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderInfo () {
  const data = 
   {
      orderNumber: '034533',
      timestamp: '2022-10-10T17:33:32.877Z',
      name: 'Death Star Starship',
      price: 360,
      ingredients: {
        bun: {
          img: "https://code.s3.yandex.net/react/code/bun-02.png",
          name: 'Zalupa',
          price: 20
        },
        other: [{
          img:"https://code.s3.yandex.net/react/code/meat-04.png",
          name: "ingredient lyuboi",
          price: 100,
          count: 3 
        }, {
          img:"https://code.s3.yandex.net/react/code/meat-04.png",
          name: "ingredient lyuboi",
          price: 50,
          count: 2 
        }, {
          img:"https://code.s3.yandex.net/react/code/meat-04.png",
          name: "ingredient lyuboi",
          price: 50,
          count: 2 
        },{
          img:"https://code.s3.yandex.net/react/code/meat-04.png",
          name: "ingredient lyuboi",
          price: 50,
          count: 2 
        },{
          img:"https://code.s3.yandex.net/react/code/meat-04.png",
          name: "ingredient lyuboi",
          price: 50,
          count: 2 
        },{
          img:"https://code.s3.yandex.net/react/code/meat-04.png",
          name: "ingredient lyuboi",
          price: 50,
          count: 2 
        }]
      },
      status: "Выполнен",
    }
 
  const bun = data.ingredients.bun;
  const other = data.ingredients.other;
  const totalPrice = bun.price*2 + other.reduce((acc, item) => acc + item.price, 0)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className="text text_type_digits-default pb-10">{`#${data.orderNumber}`}</p>
        <p className="text text_type_main-medium pb-3">{`${data.name} бургер`}</p>
        <p className="text text_type_main-small pb-15">{data.status}</p>
        <p className="text text_type_main-medium pb-6">Состав:</p>
        <ul className={`${styles.list} custom-scroll`}>
          <li className={styles.ingredient}>
            <div className={styles.border}>
              <img className={styles.image} src={bun.img} alt="Булка" />
            </div>
            <p className="text text_type_main-default">{bun.name}</p>
            <div className={styles.price}>
              <p className="text text_type_digits-default">{`2 x ${bun.price}`}</p>
              <CurrencyIcon />
            </div>
          </li>
          {other.length && other.map(ingredient => (
            <li className={styles.ingredient}>
              <div className={styles.border}>
                <img className={styles.image} src={ingredient.img} alt="Булка" />
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
          <FormattedDate date={new Date(data.timestamp)} className="text text_type_main-default text_color_inactive" />
          <div className={styles.price}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
