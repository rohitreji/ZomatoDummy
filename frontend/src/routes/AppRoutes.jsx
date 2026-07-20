import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoutes';

// Pages
import Home from '../pages/Home/Home';
import RestaurantDetails from '../pages/RestaurantDetails/RestaurantDetails';
import SearchResults from '../pages/SearchResults/SearchResults';
import CollectionsPage from '../pages/Collections/CollectionsPage';
import OffersPage from '../pages/Offers/OffersPage';
import Wishlist from '../pages/Wishlist/Wishlist';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import Orders from '../pages/Orders/Orders';
import Profile from '../pages/Profile/Profile';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import RestaurantDashboard from '../pages/RestaurantDashboard/RestaurantDashboard';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes outside layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Core application routes inside MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="restaurant/:id" element={<RestaurantDetails />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="owner" element={<ProtectedRoute><RestaurantDashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
