import styles from "./edit-profile.module.css";

import { useDispatch, useSelector } from "react-redux";

import { Input, PasswordInput, EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import { updateData } from "../../services/actions/user";

export default function Edit() {

  const user = useSelector((store) => store.user.user);

  const [ form, setForm ] = useState({name: user.name, email: user.email, password: ''});

  const dispatch = useDispatch();

  const onChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateData(form));
      console.log(user)
    }, [form]
  );

  const cancelUpdate = useCallback((e) => {
    e.preventDefault()
    setForm({...form, name: user.name, email: user.email, password: ''})
  }, [user])

  return (
    <form className={styles.form}>
      <Input placeholder={'Имя'} icon={'EditIcon'} name="name" value={form.name} onChange={onChange}/>
      <EmailInput placeholder={'Логин'} icon={'EditIcon'} name="email" value={form.email} onChange={onChange}/>
      <PasswordInput name="password"onChange={onChange} value={form.password}/>
      <div className={styles.buttons}>
        <Button onClick={cancelUpdate} type="secondary">Отменить</Button>
        <Button onClick={submitForm}>Сохранить</Button>
      </div>
    </form>
  );
};