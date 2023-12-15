import styles from "./registration.module.css";
import { Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../services/actions/user";

export default function Registration() {
  const [user, setUser] = useState({name: "", email: "", password: ""});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(register(user));
      setUser({name: "", email: "", password: ""});
    }, [user]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitForm}>
        <h1 className="text text_type_main-large">Регистрация</h1>
          <Input type={'text'}
            placeholder={'Имя'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            name="name"
            value={user.name}
            onChange={onChange}
            />
          <EmailInput 
            name="email"
            value={user.email}
            onChange={onChange}/>
          <PasswordInput 
            name="password"
            value={user.password}
            onChange={onChange}/>
          <Button htmlType="submit" type="primary" size="large" extraClass="ml-2">Зарегистрироваться</Button>
      </form>
      <div className={styles.choices}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегестрированы? <span className="text_color_interface" onClick={() => navigate("/login")}>Войти</span></p>
      </div>
    </div>
  )
}