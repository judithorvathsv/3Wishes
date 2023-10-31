import React from 'react'
import HeroSection from './HeroSection'
import iphone from '../../assets/iphone-14-pro.webp'
import mac from '../../assets/mac-system-cut.jfif'
import FeaturedProducts from './FeaturedProducts'

const HomePage = () => {
  return (
    <div>     
     <HeroSection 
        title='Buy iphone 14 Pro' 
        subtitle='Experience the power of the latest iPhone 14' 
        link='/product/654007cfaafd575452faced8' image={iphone} />


     <FeaturedProducts />


     <HeroSection 
        title='Build the ultimate setup' 
        subtitle='You can add Studio Display to your bag' 
        link='/product/654007cfaafd575452facee0' image={mac} />    
    </div>
  )
}

export default HomePage
