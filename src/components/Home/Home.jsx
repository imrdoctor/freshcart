import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import MianSlider from '../MianSlider/MianSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import RecentProducts from '../RecentProducts/RecentProducts'
export default function Home() {

  return (
    <>
        <MianSlider />
        <CategoriesSlider />
        <RecentProducts />
    </>
  )
}
