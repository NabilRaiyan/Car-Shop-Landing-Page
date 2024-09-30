// until 2 hr 4 min
// Link: https://www.youtube.com/watch?v=pUNSHPyVryU

"use client"

import Image from "next/image"
import CustomButton from "./CustomButton"

const handleScroll = () => {

}

const Hero = () => {
  return (
    <div className="hero">
        <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                Find, book or rend a car -- quickly and easily
            </h1>

            <p className="hero__subtitle">
                Streamline your car rental experience with our effortless booking process.
            </p>

            <CustomButton title = "Explore cars" 
                          containerStyles = "bg-primary-blue text-white rounded mt-10"
                          handleClick = {handleScroll} />
        </div>

        <div className="hero__image-container">
            <div className="hero__image">
                <Image src='/hero.png' fill className="object-contain" alt="hero image" />
            </div>
            <div className="hero__image-overlay" />
        </div>

    </div>
  )
}

export default Hero
