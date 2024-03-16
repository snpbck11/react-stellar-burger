import React, { FC } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import icon from '../../images/graphics.svg';
import styles from './order-details.module.css';

interface IOrderDetailsProps {
  orderNumber: number;
  loader: React.ReactNode;
};

const OrderDetails: FC<IOrderDetailsProps> = ({ orderNumber, loader }) => {
  return (
    <div className={styles.container}>
      <h2 className='text text_type_digits-large mt-30 mb-8'>{orderNumber ? orderNumber : '9999'}</h2>
      <p className='text text_type_main-medium mb-15'>Идентификатор заказа</p>
      <div className={styles.loader}>
        {loader ?
          <ThreeDots />
          : <img src={icon} alt="Галочка" />
        }
      </div>
      <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;