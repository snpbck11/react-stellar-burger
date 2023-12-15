import styles from "./app-header.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const isConstructor = location.pathname === "/";
  const isFeed = location.pathname.includes("/feed");
  const isProfile = location.pathname.includes("/profile") 

  return(
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.list}>
          <NavLink to="/" className={`${styles.link} link mt-4 mb-4 mr-5 text_color_inactive`}>
              <BurgerIcon type={!isConstructor ? "secondary" : "primary"} />
              <p className="text text_type_main-default">Конструктор</p>
          </NavLink>
          <NavLink to="/feed" className={`${styles.link} link mt-4 mb-4 mr-5 ml-5 text_color_inactive`}>
              <ListIcon type={!isFeed ? "secondary" : "primary"} />
              <p className="text text_type_main-default">Лента заказов</p>
          </NavLink>
        </nav>
        <div className={`${styles.logo} link`} onClick={() => navigate("/")}>
          <Logo />
        </div>
        <NavLink to="/profile" className={`${styles.link} link mt-4 mb-4 ml-5 text_color_inactive`}>
          <ProfileIcon type={!isProfile ? "secondary" : "primary"} />
          <p className="text text_type_main-default">Личный кабинет</p>
        </NavLink>
      </div>
    </header>
  )
}