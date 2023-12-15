import styles from "./forgot-password.module.css";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPaswordRequest } from "../../utils/api";

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onChange = e => {
    setEmail(e.target.value)
  }

  const submitForm = useCallback(
    e => {
      e.preventDefault();
      forgotPaswordRequest(email)
      .then(() => navigate("/reset-password", {state: {from: "/forgot-password"}}))
    }, [email]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitForm}>
        <h1 className="text text_type_main-large">Восстановление пароля</h1>
          <EmailInput placeholder={'Укажите e-mail'} name={"email"} value={email} onChange={onChange} />
          <Button htmlType="submit" type="primary" size="large" extraClass="ml-2">Восстановить</Button>
      </form>
      <div className={styles.choices}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <span className="text_color_interface" onClick={() => navigate("/login")}>Войти</span></p>
      </div>
    </div>
  )
}