import React from 'react'
import Carousel from '../../components/common/Carousel/Carousel'
import ProdCollections from '../product/Collections/ProdCollections'
import ProjCategories from '../product/Categories/ProjCategories'
import ShopByBudget from '../../components/budget/ShopByBudget'
import SecondaryNav from '../../components/navigationBar/SecondaryNav'

const HomeScreen = () => {
  return (
    <div>
      <SecondaryNav/>
      <Carousel/>
      <ProdCollections/>
      <ProjCategories/>
      <ShopByBudget/>
    </div>
  )
}

export default HomeScreen
