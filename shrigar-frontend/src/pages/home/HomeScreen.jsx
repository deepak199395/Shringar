import React from 'react'
import Carousel from '../../components/common/Carousel/Carousel'
import ProdCollections from '../product/Collections/ProdCollections'
import ProjCategories from '../product/Categories/ProjCategories'

const HomeScreen = () => {
  return (
    <div>
      <Carousel/>
      <ProdCollections/>
      <ProjCategories/>
    </div>
  )
}

export default HomeScreen
