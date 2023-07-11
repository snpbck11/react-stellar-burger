import { ingredientPropType } from '../../utils/prop-types';
import styles from './ingredient-details.module.css';


export default function IngredientDetails({details}) {

  return (
    <div className={styles.container}>
      <h2 className='text text_type_main-large mt-10 mr-10 ml-10' style={{alignSelf: 'flex-start'}}>Детали ингредиента</h2>
      <div className={styles.image}>
        <img src={details.image} alt={`Изображение ${details.name}`} style={{width: '100%'}} />
      </div>
      <p className='text text_type_main-medium mt-4 mb-8'>{details.name}</p>
      <ul className={styles.list}>
        <li className={styles.item}>
          <p className='text text_type_main-small text_color_inactive'>Калории, ккал</p>
          <p className='text text_type_digits-default text_color_inactive'>{details.calories}</p>
        </li>
        <li className={styles.item}>
          <p className='text text_type_main-small text_color_inactive'>Белки, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{details.proteins}</p>
        </li>
        <li className={styles.item}>
          <p className='text text_type_main-small text_color_inactive'>Жиры, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{details.fat}</p>
        </li>
        <li className={styles.item}>
          <p className='text text_type_main-small text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_digits-default text_color_inactive'>{details.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  details: ingredientPropType.isRequired
}