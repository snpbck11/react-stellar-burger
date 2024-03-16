export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  uniqueId?: string,
  index: number
};

export type TOrder = {
  _id: string,
  ingredients: Array<string>,
  status: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  number: number
};

export type TOrderInfo = TOrder & {
  owner: string,
  __v: number
};

export type TMessage = {
  success: boolean,
  orders: ReadonlyArray<TOrder>,
  total: number,
  totalToday: number,
  message?: string
};

export type TUser = {
  email: string,
  password?: string,
  name: string
  token?: string
};

export type TUserResetPassword = Pick<TUser, "password" | "token">

export interface IModalProps {
  onClose: () => void;
};