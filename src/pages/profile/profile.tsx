import { FC, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "../../hooks";
import { connect, disconnect } from "../../services/actions/feed";
import { checkUserAuth, logout } from "../../services/actions/user";
import { wsUrlProfile } from "../../utils/ws-status";
import styles from "./profile.module.css";

const Profile: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const accessToken: string = localStorage.getItem("accessToken")?.replace("Bearer ", "") || "";

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [])

  useEffect(() => {
    if (accessToken) {
      dispatch(connect(wsUrlProfile(accessToken)));
    }
    return () => {
      dispatch(disconnect());
    };
  }, []);

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
  );
};

export default Profile;