import styles from "./reset-password.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../../utils/api";

import { useState, useCallback } from 'react';

export default function ResetPassword() {
  const [form, setForm] = useState({password: "", token: ""});

  const onChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
    console.log(form)
  };

  const submitForm = useCallback(
    e => {
      e.preventDefault();
      resetPassword(form);
    }, [form]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className="text text_type_main-large">Восстановление пароля</h1>
          <PasswordInput placeholder={'Введите новый пароль'} name="password" value={form.password} onChange={onChange} />
          <Input placeholder={'Введите код из письма'} name="token" value={form.token} onChange={onChange} />
          <Button htmlType="submit" type="primary" size="large" extraClass="ml-2" onClick={submitForm}>Сохранить</Button>
      </form>
      <div className={styles.choices}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? Войти</p>
      </div>
    </div>
  )
}