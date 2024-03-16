import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../hooks';
import { TIngredient } from '../../services/types/data';
import styles from './ingredient-details.module.css';

const IngredientDetails: FC = () => {

  const { ingredients } = useSelector(store => store.ingredients);

  const [ingredient, setIngredient] = useState<TIngredient>();

  const { id } = useParams();

  const loadIngredientInfo = useCallback(
    () => {
      const currentIngredient = ingredients.find(({ _id }) => _id === id);
      setIngredient(currentIngredient);
    }, [id, ingredients]
  );

  useEffect(() => {
    loadIngredientInfo()
  }, [loadIngredientInfo, ingredients]);

  return (
    <>
      {ingredient !== undefined && (
        <div className={styles.container}>
          <h2 className='text text_type_main-large mt-10 mr-10 ml-10'>Детали ингредиента</h2>
          <div className={styles.image}>
            <img src={ingredient.image} alt={`Изображение ${ingredient.name}`} style={{ width: '100%' }} />
          </div>
          <p className='text text_type_main-medium mt-4 mb-8'>{ingredient.name}</p>
          <ul className={styles.list}>
            <li className={styles.item}>
              <p className='text text_type_main-small text_color_inactive'>Калории, ккал</p>
              <p className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</p>
            </li>
            <li className={styles.item}>
              <p className='text text_type_main-small text_color_inactive'>Белки, г</p>
              <p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</p>
            </li>
            <li className={styles.item}>
              <p className='text text_type_main-small text_color_inactive'>Жиры, г</p>
              <p className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</p>
            </li>
            <li className={styles.item}>
              <p className='text text_type_main-small text_color_inactive'>Углеводы, г</p>
              <p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default IngredientDetails;