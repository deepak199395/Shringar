import React from 'react'
import Carousel from '../../components/common/Carousel/Carousel'
import ProjCategories from '../product/Categories/ProjCategories'
import ShopByBudget from '../../components/budget/ShopByBudget'
import SecondaryNav from '../../components/navigationBar/SecondaryNav'
import Collections from '../product/Collections/Collections'

const HomeScreen = () => {
  return (
    <div>
      <SecondaryNav/>
      <Carousel/>
      <Collections/>
      <ProjCategories/>
      <ShopByBudget/>
    </div>
  )
}

export default HomeScreen
