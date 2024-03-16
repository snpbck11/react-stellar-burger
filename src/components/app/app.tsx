import { useEffect, useMemo } from "react";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "../../hooks";
import Feed from "../../pages/feed/feed";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import OrderInfo from "../../pages/order-info/order-info";
import Profile from "../../pages/profile/profile";
import Registration from "../../pages/registration/registration";
import ResetPassword from "../../pages/reset-password/reset-password";
import { getIngredients } from "../../services/actions/ingredients";
import { checkUserAuth } from "../../services/actions/user";
import AppHeader from "../app-header/app-header";
import Edit from "../edit-profile/edit-profile";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderFeed from "../order-feed/order-feed";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";

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
            <Route path="/profile" element={<OnlyAuth onlyUnAuth={false} component={<Profile />} />} >
              <Route path="/profile/orders" element={<OnlyAuth onlyUnAuth={false} component={<OrderFeed orders={reverseOrders} />} />} />
              <Route path="/profile/" element={<OnlyAuth onlyUnAuth={false} component={<Edit />} />} />
            </Route>
            <Route path="/profile/orders/:orderNumber" element={<OnlyAuth onlyUnAuth={false} component={<OrderInfo />} />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/feed/:orderNumber" element={<OrderInfo />} />
            <Route path="/ingredients/:id" element={<IngredientDetails />} />
            <Route path="*" element={<p>Страница не существует</p>} />
          </Routes>
          {background && (
            <Routes>
              <Route path="/ingredients/:id" element={<Modal onClose={handleCloseModal}><IngredientDetails /></Modal>} />
              <Route path="/profile/orders/:orderNumber" element={<OnlyAuth onlyUnAuth={false} component={<Modal onClose={handleCloseModal}><OrderInfo /></Modal>} />} />
              <Route path="/feed/:orderNumber" element={<Modal onClose={handleCloseModal}><OrderInfo /></Modal>} />
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;