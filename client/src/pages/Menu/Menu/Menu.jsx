import React from 'react';
import { Helmet } from 'react-helmet-async';
import menuImg from '../../../assets/menu/banner3.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/Menucategory';
import Cover from '../../shared/Cover/Cover';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';

const Menu = () => {
  const [menu] = useMenu();
  const desert = menu.filter((item) => item.category === 'dessert');
  const salad = menu.filter((item) => item.category === 'salad');
  const soup = menu.filter((item) => item.category === 'soup');
  const pizza = menu.filter((item) => item.category === 'pizza');
  const todayOffered = menu.filter((item) => item.category === 'offered');
  return (
    <div>
      <Helmet>
        <title>Boss | Menu </title>
        <link rel='canonical' href='https://www.tacobell.com/' />
      </Helmet>
      <Cover img={menuImg} title={'Our Menu'} />
      <SectionTitle heading={"TODAY'S OFFER"} subheading={"Don't miss"} />

      {/* Offered Menu items */}
      <MenuCategory items={todayOffered} />

      {/* Dessert menu items */}
      <MenuCategory items={desert} title={'Dessert'} img={dessertImg} />

      {/* Pizza */}
      <MenuCategory items={pizza} title={'Pizza'} img={pizzaImg} />
      {/* Salad */}
      <MenuCategory items={salad} title={'Salad'} img={saladImg} />
      {/* Soup */}
      <MenuCategory items={soup} title={'Soup'} img={soupImg} />
    </div>
  );
};

export default Menu;
