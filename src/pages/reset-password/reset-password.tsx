import styles from "./reset-password.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../../utils/api";

import { useState, useCallback, useEffect, FC } from 'react';
import { useLocation, useNavigate } from "react-router";

const ResetPassword: FC = () => {
  const [form, setForm] = useState({ password: "", token: "" });
  const [error, setError] = useState({ success: false, message: '' });

  const location = useLocation();
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      resetPassword(form)
        .then((res) => {
          if (res.success) {
            navigate("/login")
          }
        })
        .catch((err) => setError({ success: !err.success, message: err.message }))
    }, [form, navigate]
  );

  useEffect(() => {
    if (location.state?.from !== "/forgot-password") {
      return navigate("/")
    }
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitForm}>
        <h1 className="text text_type_main-large">Восстановление пароля</h1>
        <PasswordInput placeholder={'Введите новый пароль'} name="password" value={form.password} onChange={onChange} />
        <Input placeholder={'Введите код из письма'} name="token" value={form.token} onChange={onChange} error={error.success} errorText={error.message} />
        <Button htmlType="submit" type="primary" size="large" extraClass="ml-2">Сохранить</Button>
      </form>
      <div className={styles.choices}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <span className="text_color_interface" onClick={() => navigate("/login")}>Войти</span></p>
      </div>
    </div>
  );
};

export default ResetPassword;