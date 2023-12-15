import styles from "./edit-profile.module.css";

import { useDispatch, useSelector } from "react-redux";
import { Input, PasswordInput, EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";
import { updateData } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";

export default function Edit() {

  const user = useSelector((store) => store.user.user);

  const {values, setValues, handleChange} = useForm({name: user.name, email: user.email, password: ''});

  const dispatch = useDispatch();

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateData(values));
    }, [values, dispatch]
  );

  const cancelUpdate = useCallback((e) => {
    e.preventDefault()
    setValues({name: user.name, email: user.email, password: ''})
  }, [setValues, user.name, user.email]);

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <Input placeholder={'Имя'} icon={'EditIcon'} name="name" value={values.name} onChange={handleChange}/>
      <EmailInput placeholder={'Логин'} icon={'EditIcon'} name="email" value={values.email} onChange={handleChange}/>
      <PasswordInput name="password"onChange={handleChange} value={values.password}/>
      <div className={styles.buttons}>
        <Button htmlType="button" type="secondary" onClick={cancelUpdate}>Отменить</Button>
        <Button htmlType="submit">Сохранить</Button>
      </div>
    </form>
  );
};