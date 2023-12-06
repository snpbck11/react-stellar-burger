import styles from "./registration.module.css";
import { Button, EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";
import { getRegister } from "../../utils/api";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setUser, setAuthChecked } from "../../services/actions/user";

export default function Registration() {
  const [form, setForm] = useState({name: "", email: "", password: ""});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  let errMessage = '';

  const onChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      getRegister(form)
      .then((res) => {
        if (res.success) {
          dispatch(setAuthChecked(true));
          dispatch(setUser(res.user));
          console.log(`${location} локация регистрации`)
          // Куда-то нужно сунуть токен
        }
      })
      .then(() => navigate("/login"))
    }, [form]
  ) 



  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className="text text_type_main-large">Регистрация</h1>
          <Input type={'text'}
            placeholder={'Имя'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            name="name"
            value={form.name}
            onChange={onChange}
            />
          <EmailInput 
            name="email"
            value={form.email}
            onChange={onChange}/>
          <PasswordInput 
            name="password"
            value={form.password}
            onChange={onChange}/>
          <Button htmlType="submit" type="primary" size="large" extraClass="ml-2" onClick={submitForm}>Зарегистрироваться</Button>
      </form>
      <div className={styles.choices}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегестрированы? <span className="text_color_interface" onClick={() => navigate("/login")}>Войти</span></p>
      </div>
    </div>
  )
}