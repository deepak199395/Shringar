import React from 'react'
import Carousel from '../../components/common/Carousel/Carousel'
import ProdCollections from '../product/Collections/ProdCollections'
import ProjCategories from '../product/Categories/ProjCategories'
import ShopByBudget from '../../components/budget/ShopByBudget'

const HomeScreen = () => {
  return (
    <div>
      <Carousel/>
      <ProdCollections/>
      <ProjCategories/>
      <ShopByBudget/>
    </div>
  )
}

export default HomeScreen
