import React from 'react';
import Hero from '../../sections/Hero/Hero';
import Categories from '../../sections/Categories/Categories';
import PopularRestaurants from '../../sections/PopularRestaurants/PopularRestaurants';
import Collections from '../../sections/Collections/Collections';
import Offers from '../../sections/Offers/Offers';
import TrendingRestaurants from '../../sections/TrendingRestaurants/TrendingRestaurants';
import Reviews from '../../sections/Reviews/Reviews';
import DownloadApp from '../../sections/DownloadApp/DownloadApp';
import BecomePartner from '../../sections/BecomePartner/BecomePartner';
import FAQ from '../../sections/FAQ/FAQ';
import Newsletter from '../../sections/Newsletter/Newsletter';

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <Categories />
      <PopularRestaurants />
      <Collections />
      <Offers />
      <TrendingRestaurants />
      <Reviews />
      <DownloadApp />
      <BecomePartner />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;
