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

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { checkUserAuth } from "../../services/actions/user";

function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleCloseModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<Registration />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} >
          <Route path="/profile/orders" element={<OnlyAuth component={<OrderFeed />} />} />
          <Route path="/profile/" element={<OnlyAuth component={<Edit />} />} />
        </Route>
        <Route path="/profile/orders/:number" element={<OnlyAuth component={<OrderInfo />} />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:number" element={<OrderInfo />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="*" element={<p>Страница не существует</p>} />
      </Routes>
      <Routes>
        { background && (
          <>
            <Route path="/ingredients/:id" element={<Modal onClose={handleCloseModal}><IngredientDetails /></Modal>} />
            <Route path="/profile/orders/:number"element={<OnlyAuth component={<Modal onClose={handleCloseModal}><OrderInfo /></Modal>} />} />
            <Route path="/feed/:number" element={<Modal onClose={handleCloseModal}><OrderInfo /></Modal>} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;