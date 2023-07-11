import {useState} from "react";
import styles from "../ingredient/ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { ingredientPropType } from "../../utils/prop-types";

export default function Ingredient({props, handleIngredientClick}) {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    props.type !== 'bun' ? setCounter(counter + 1) : setCounter(2);
    handleIngredientClick(props);
  }

  return (
    <li className={styles.item} onClick={handleClick}>
      <img src={props.image} alt={props.name} className="ml-4 mr-4"/>
      <div className={`${styles.price} mb-1 mt-1`}>
        <p className="text text_type_digits-medium">{props.price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default" style={{minHeight: 48, textAlign: 'center'}}>{props.name}</p>
      {counter > 0 && (<Counter count={counter} />)}
    </li>
  )
}

Ingredient.propTypes = {
  props: ingredientPropType
}