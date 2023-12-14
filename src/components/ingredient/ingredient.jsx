import PropTypes from "prop-types";
import { useMemo } from "react";
import styles from "../ingredient/ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { ingredientPropType } from "../../utils/prop-types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

export default function Ingredient({ingredient}) {
  const { bun, ingredients } = useSelector(state => state.burgerConstructor);

  const location = useLocation();
  const ingredientId = ingredient['_id'];

  const [, dragRef] = useDrag({
    type: "ingredients",
    item: ingredient
  })

  const count = useMemo(() => {    
    if (ingredient.type ==='bun') {
      return ingredient._id === bun._id ? 2 : 0;
    }
   return ingredients.filter((item) => item._id === ingredient._id).length;
 }, [bun, ingredients]);

  return (
    <Link to={{pathname: `/ingredients/${ingredientId}`}} state={{background: location}} className="link">
      <li ref={dragRef} className={styles.item}>
        <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4"/>
        <div className={`${styles.price} mb-1 mt-1`}>
          <p className="text text_type_digits-medium">{ingredient.price}</p>
          <CurrencyIcon />
        </div>
        <p className="text text_type_main-default" style={{minHeight: 48, textAlign: 'center'}}>{ingredient.name}</p>
        {count > 0 && (<Counter count={count} />)}
      </li>
    </Link>
  )
}

Ingredient.propTypes = {
  ingredient: ingredientPropType,
  handleIngredientClick: PropTypes.func
}