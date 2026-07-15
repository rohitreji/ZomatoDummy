import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

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
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes outside layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Core application routes inside MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="restaurant/:id" element={<RestaurantDetails />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
