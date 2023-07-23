import styles from './order-details.module.css';
import icon from '../../images/graphics.svg';
import PropTypes from 'prop-types';

export default function OrderDetails({orderNumber}) {

  return (
    <div className={styles.container}>
      <h2 className='text text_type_digits-large mt-30 mb-8'>{orderNumber}</h2>
      <p className='text text_type_main-medium mb-15'>Идентификатор заказа</p>
      <div className={styles.image}>
        <img src={icon} alt="Галочка" />
      </div>
      <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number
}