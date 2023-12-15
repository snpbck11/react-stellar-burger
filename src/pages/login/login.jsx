import styles from "./login.module.css";
import { login } from "../../services/actions/user";
import { Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useForm } from "../../hooks/useForm";

export default function Login() {
  const {values, setValues, handleChange} = useForm({email: "", password: ""});

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login(values));
      setValues({email: "", password: ""})
    }, [values, dispatch, setValues]
  ); 

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitForm}>
        <h1 className="text text_type_main-large">Вход</h1>
          <EmailInput
            name="email"
            value={values.email}
            onChange={handleChange}/>
          <PasswordInput 
          name="password"
            value={values.password}
            onChange={handleChange}/>
          <Button htmlType="submit" type="primary" size="large" extraClass="ml-2">Войти</Button>
      </form>
      <div className={styles.choices}>
        <p className="text text_type_main-default text_color_inactive">Вы - новый пользователь? <span className="text_color_interface" onClick={() => navigate("/register")}>Зарегистрироваться</span></p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <span className="text_color_interface" onClick={() => navigate("/forgot-password")}>Восстановить пароль</span></p>
      </div>
    </div>
  );
} 