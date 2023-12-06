import styles from "./login.module.css";
import { Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();


  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className="text text_type_main-large">Вход</h1>
          <EmailInput />
          <PasswordInput />
          <Button htmlType="submit" type="primary" size="large" extraClass="ml-2">Войти</Button>
      </form>
      <div className={styles.choices}>
        <p className="text text_type_main-default text_color_inactive">Вы - новый пользователь? <span className="text_color_interface" onClick={() => navigate("/register")}>Зарегистрироваться</span></p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <span className="text_color_interface" onClick={() => navigate("/forgot-password")}>Восстановить пароль</span></p>
      </div>
    </div>
  )
} 