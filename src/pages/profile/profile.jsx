import { useDispatch } from "react-redux";
import styles from "./profile.module.css";

import { logout } from "../../services/actions/user";

import { useLocation, Outlet, NavLink } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const location = useLocation();

  return (
    <div className={styles.container}>
      <nav className={styles.list}>
        <NavLink to="/profile" end
          className="link text text_type_main-large pb-5 text_color_inactive" >
          Профиль
        </NavLink>
        <NavLink to="/profile/orders" 
          className="link text text_type_main-large pt-5 pb-5 text_color_inactive" >
            История заказов
          </NavLink>
        <p className="link text text_type_main-large text_color_inactive pt-5 pb-5" onClick={() => handleLogout()}>Выход</p>
        <li className="text text_type_main-default text_color_inactive pt-20">{location.pathname !== "/profile"
        ? "В этом разделе вы можете посмотреть свою историю заказов" 
        : "В этом разделе вы можете изменить свои персональные данные"}</li>
      </nav>
      <Outlet />
    </div>
  )
}