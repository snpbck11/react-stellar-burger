import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../hooks";
import { useForm } from "../../hooks/useForm";
import { register } from "../../services/actions/user";
import styles from "./registration.module.css";

const Registration: FC = () => {
  const { values, setValues, handleChange } = useForm({ name: "", email: "", password: "" })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(register(values));
      setValues({ name: "", email: "", password: "" });
    }, [values]
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
          value={values.name}
          onChange={handleChange}
        />
        <EmailInput
          name="email"
          value={values.email}
          onChange={handleChange} />
        <PasswordInput
          name="password"
          value={values.password}
          onChange={handleChange} />
        <Button htmlType="submit" type="primary" size="large" extraClass="ml-2">Зарегистрироваться</Button>
      </form>
      <div className={styles.choices}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегестрированы? <span className="text_color_interface" onClick={() => navigate("/login")}>Войти</span></p>
      </div>
    </div>
  );
};

export default Registration;