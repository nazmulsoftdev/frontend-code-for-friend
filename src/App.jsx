import React from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotpasswordPage from "./pages/ForgotpasswordPage";
import HomePage from "./pages/HomePage";
import ProductView from "./pages/ProductView";
import CheckoutPage from "./pages/CheckoutPage";
import useCheckAuth from "./hooks/useCheckAuth";
import Loader from "./UI/Loader";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import SettingPage from "./pages/SettingPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import OrderPage from "./pages/OrderPage";
import AdminOrderPage from "./pages/AdminOrderPage";

function App() {
  const checkAuth = useCheckAuth();
  return (
    <>
      {!checkAuth ? (
        <Loader />
      ) : (
        <>
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/setting"
              element={
                <PrivateRoute>
                  <SettingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PrivateRoute>
                  <ProductView />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <CheckoutPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/order"
              element={
                <PrivateRoute>
                  <OrderPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path="/forgotpassword"
              element={
                <PublicRoute>
                  <ForgotpasswordPage />
                </PublicRoute>
              }
            />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/order" element={<AdminOrderPage />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
