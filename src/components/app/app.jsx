import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import Registration from "../../pages/registration/registration";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import Feed from "../../pages/feed/feed";
import OrderInfo from "../order-info/order-info";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";


import { useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const { ingredientsFailed } = useSelector(state => state.ingredients); // Вернёмся к проверке позже

  return (
    <div className={styles.app}>
      <Router>
      <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<Registration />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/ingredients/:id" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;