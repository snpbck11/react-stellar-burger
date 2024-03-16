import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "../../hooks/index";
import { TIngredient } from "../../services/types/data";
import styles from "../ingredient/ingredient.module.css";

type TIngredeintProps = {
  ingredient: TIngredient;
};

export const Ingredient: FC<TIngredeintProps> = ({ ingredient }) => {
  const { bun, ingredients } = useSelector(state => state.burgerConstructor);

  const location = useLocation();
  const ingredientId = ingredient['_id'];

  const [, dragRef] = useDrag({
    type: "ingredients",
    item: ingredient
  })

  const count = useMemo(() => {
    if (ingredient.type === 'bun' && bun) {
      return ingredient._id === bun._id ? 2 : 0;
    }
    return ingredients.filter((item) => item._id === ingredient._id).length;
  }, [bun, ingredients]);

  return (
    <li ref={dragRef} className={styles.item}>
    <Link to={{ pathname: `/ingredients/${ingredientId}` }} state={{ background: location }} className="link">
      
        <img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4" />
        <div className={`${styles.price} mb-1 mt-1`}>
          <p className="text text_type_digits-medium">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{ingredient.name}</p>
        {count > 0 && (<Counter count={count} />)}
   
    </Link>
    </li>
  );
};

