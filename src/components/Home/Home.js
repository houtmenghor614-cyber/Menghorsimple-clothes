import React from 'react';
import Hero from './Hero';
import Categories from './Categories';
import FeaturedProducts from './FeaturedProducts';

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
    </div>
  );
};

export default Home;