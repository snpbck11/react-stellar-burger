import styles from "./login.module.css";
import { login } from "../../services/actions/user";
import { Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Login() {
  const [user, setUser] = useState({email: "", password: ""});

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const onChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login(user));
    }, []
  ); 

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className="text text_type_main-large">Вход</h1>
          <EmailInput
            name="email"
            value={user.email}
            onChange={onChange}/>
          <PasswordInput 
          name="password"
            value={user.password}
            onChange={onChange}/>
          <Button htmlType="submit" type="primary" size="large" extraClass="ml-2" onClick={submitForm}>Войти</Button>
      </form>
      <div className={styles.choices}>
        <p className="text text_type_main-default text_color_inactive">Вы - новый пользователь? <span className="text_color_interface" onClick={() => navigate("/register")}>Зарегистрироваться</span></p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <span className="text_color_interface" onClick={() => navigate("/forgot-password")}>Восстановить пароль</span></p>
      </div>
    </div>
  );
} 