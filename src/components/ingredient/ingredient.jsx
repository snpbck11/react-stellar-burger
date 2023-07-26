import PropTypes from "prop-types";
import { useMemo, useContext } from "react";
import styles from "../ingredient/ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { ingredientPropType } from "../../utils/prop-types";
import { BurgerContext } from "../../utils/burger-context";

export default function Ingredient({ingredient, handleIngredientClick}) {
  const {selectedIngredients} = useContext(BurgerContext)

  const count = useMemo(() => {
    const { bun, ingredients } = selectedIngredients;
    if (ingredient.type ==='bun') {
      return ingredient._id === bun._id ? 2 : 0;
    }
   return ingredients.filter((item) => item._id === ingredient._id).length;
 }, [selectedIngredients.bun, selectedIngredients.ingredients]);

  const handleClick = () => {
    handleIngredientClick(ingredient);
  }

  return (
    <li className={styles.item} onClick={handleClick}>
      <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4"/>
      <div className={`${styles.price} mb-1 mt-1`}>
        <p className="text text_type_digits-medium">{ingredient.price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default" style={{minHeight: 48, textAlign: 'center'}}>{ingredient.name}</p>
      {count > 0 && (<Counter count={count} />)}
    </li>
  )
}

Ingredient.propTypes = {
  ingredient: ingredientPropType,
  selectedIngredients: PropTypes.object
}