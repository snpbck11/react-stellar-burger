import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "../../hooks";
import { useForm } from "../../hooks/useForm";
import { updateData } from "../../services/actions/user";
import styles from "./edit-profile.module.css";

const Edit: FC = () => {

  const user = useSelector((store) => store.user.user);

  const userName = user ? user.name : '';
  const userEmail = user ? user.email : '';

  const { values, setValues, handleChange } = useForm({ name: userName, email: userEmail, password: '' });
  const dispatch = useDispatch();

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateData(values));
    }, [values, dispatch]
  );

  const cancelUpdate = useCallback((e) => {
    e.preventDefault()
    setValues({ name: userName, email: userEmail, password: '' })
  }, [setValues, userName, userEmail]);

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <Input placeholder={'Имя'} icon={'EditIcon'} name="name" value={values.name} onChange={handleChange} />
      <EmailInput placeholder={'Логин'} isIcon={true} name="email" value={values.email} onChange={handleChange} />
      <PasswordInput name="password" onChange={handleChange} value={values.password || ''} />
      <div className={styles.buttons}>
        <Button htmlType="button" type="secondary" onClick={cancelUpdate}>Отменить</Button>
        <Button htmlType="submit">Сохранить</Button>
      </div>
    </form>
  );
};

export default Edit;