import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
  return(
    <header className={styles.header}>
      <div className={styles.container}>
        <ul className={styles.list}>
          <li>
            <a href="#" className={`${styles.link} mt-4 mb-4 mr-5`}>
              <BurgerIcon />
              <p className="text text_type_main-default">Конструктор</p>
            </a>
          </li>
          <li>
            <a href="#" className={`${styles.link} mt-4 mb-4 mr-5 ml-5`}>
              <ListIcon />
              <p className="text text_type_main-default">Лента заказов</p>
            </a>
          </li>
        </ul>
        <div className={styles.logo}>
          <Logo />
        </div>
        <a href="#" className={`${styles.link} mt-4 mb-4 ml-5`}>
          <ProfileIcon />
          <p className="text text_type_main-default">Личный кабинет</p>
        </a>
      </div>
    </header>
  )
}