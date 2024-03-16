import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { forgotPaswordRequest } from "../../utils/api";
import styles from "./forgot-password.module.css";

const ForgotPassword: FC = () => {
  const { values, setValues, handleChange } = useForm({ email: "" })
  const navigate = useNavigate();

  const submitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      forgotPaswordRequest(values.email)
        .then(() => navigate("/reset-password", { state: { from: "/forgot-password" } }))
        .finally(() => setValues({ email: "" }))
    }, [values.email]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitForm}>
        <h1 className="text text_type_main-large">Восстановление пароля</h1>
        <EmailInput placeholder={'Укажите e-mail'} name={"email"} value={values.email} onChange={handleChange} />
        <Button htmlType="submit" type="primary" size="large" extraClass="ml-2">Восстановить</Button>
      </form>
      <div className={styles.choices}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <span className="text_color_interface" onClick={() => navigate("/login")}>Войти</span></p>
      </div>
    </div>
  );
};

export default ForgotPassword;