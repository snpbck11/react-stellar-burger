import styles from "./profile.module.css";
import { Input, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderFeed from "../../components/order-feed/order-feed";

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
const [current, setCurrent] = useState(null);

const navigate = useNavigate();
const location = useLocation();

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



const checkPathname = (pathname) => {
  return pathname === location.pathname
}

useEffect(() => {
  console.log(location) 
  console.log(checkPathname('/profile'))   
})


  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={`${!checkPathname('/profile') ? "text_color_inactive" : null} text text_type_main-large pt-5 pb-5`}>Профиль</li>
        <li className={`${!checkPathname('/profile/orders') ? "text_color_inactive" : null} text text_type_main-large pt-5 pb-5`}>История заказов</li>
        <li className="text text_type_main-large text_color_inactive pt-5 pb-5">Выход</li>
        <li className="text text_type_main-default text_color_inactive pt-20">{checkPathname('/profile/orders') 
        ? "В этом разделе вы можете посмотреть свою историю заказов" 
        : "В этом разделе вы можете изменить свои персональные данные"}</li>
      </ul>
      { checkPathname('/profile/orders') && <OrderFeed data={data}/> }
      { checkPathname('/profile') &&       
      <form className={styles.form}>
        <Input placeholder={'Имя'}/>
        <EmailInput placeholder={'Логин'}/>
        <PasswordInput />
      </form> }
    </div>
  )
}