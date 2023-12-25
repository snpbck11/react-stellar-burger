import AppHeader from "../app-header/app-header";
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import Registration from "../../pages/registration/registration";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import Feed from "../../pages/feed/feed";
import OrderInfo from "../../pages/order-info/order-info";
import OrderFeed from "../order-feed/order-feed";
import Edit from "../edit-profile/edit-profile";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { checkUserAuth } from "../../services/actions/user";
import { getIngredients } from "../../utils/api";

function App() {

  const ingredients = useSelector(store => store.ingredients.ingredients);
  const orders = useSelector(store => store.feed.orders);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const reverseOrders = useMemo(() => orders.slice().reverse(), [orders]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <>
      {ingredients.length !== 0 && (
        <>
          <AppHeader />
          <Routes location={background || location}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
            <Route path="/register" element={<OnlyUnAuth component={<Registration />} />} />
            <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
            <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
            <Route path="/profile" element={<OnlyAuth component={<Profile />} />} >
              <Route path="/profile/orders" element={<OnlyAuth component={<OrderFeed orders={reverseOrders}/>} />} />
              <Route path="/profile/" element={<OnlyAuth component={<Edit />} />} />
            </Route>
            <Route path="/profile/orders/:orderNumber" element={<OnlyAuth component={<OrderInfo />} />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/feed/:orderNumber" element={<OrderInfo />} />
            <Route path="/ingredients/:id" element={<IngredientDetails />} />
            <Route path="*" element={<p>Страница не существует</p>} />
          </Routes>
          {background && (
            <Routes>
              <Route path="/ingredients/:id" element={<Modal onClose={handleCloseModal}><IngredientDetails /></Modal>} />
              <Route path="/profile/orders/:orderNumber" element={<OnlyAuth component={<Modal onClose={handleCloseModal}><OrderInfo /></Modal>} />} />
              <Route path="/feed/:orderNumber" element={<Modal onClose={handleCloseModal}><OrderInfo /></Modal>} />
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;