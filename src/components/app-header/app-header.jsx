import styles from "./app-header.module.css";
import { useNavigate } from "react-router-dom";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
  const navigate = useNavigate();

  return(
    <header className={styles.header}>
      <div className={styles.container}>
        <ul className={styles.list}>
          <li className={`${styles.link} mt-4 mb-4 mr-5`} onClick={() => navigate("/")}>
              <BurgerIcon />
              <p className="text text_type_main-default">Конструктор</p>
          </li>
          <li className={`${styles.link} mt-4 mb-4 mr-5 ml-5`} onClick={() => navigate("/feed")}>
              <ListIcon />
              <p className="text text_type_main-default">Лента заказов</p>
          </li>
        </ul>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={`${styles.link} mt-4 mb-4 ml-5`} onClick={() => navigate("/profile")}>
          <ProfileIcon />
          <p className="text text_type_main-default">Личный кабинет</p>
        </div>
      </div>
    </header>
  )
}