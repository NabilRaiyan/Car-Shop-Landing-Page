"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CarProps } from '@/types';
import CustomButton from './CustomButton';
import { calculateCarRent, generateCarImageURL } from '@/utils';
import CarDetails from './CarDetails';

interface CarCardProps {
    car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
    const { city_mpg, year, make, model, transmission, drive } = car;
    const carRent = calculateCarRent(city_mpg, year);
    const [isOpen, setIsOpen] = useState(false);
    const [carImageURL, setCarImageURL] = useState<string | null>(null);


    useEffect(() => {
        const fetchImageURL = async () => {
            const url = await generateCarImageURL(car);
            setCarImageURL(url);
        };

        fetchImageURL();
    }, [car]);

    return (
        <div className='car-card group'>
            <div className='car-card__content'>
                <h2 className='car-card__content-title'>
                    {make} {model}
                </h2>
            </div>

            <p className='flex mt-6 text-[32px] font-extrabold'>
                <span className='self-start text-[14px] font-semibold'>$</span>
                {carRent}
                <span className='self-end text-[14px] font-medium'>/day</span>
            </p>

            <div className='relative w-full h-40 my-3 object-contain'>
            {carImageURL ? (
                    <Image src="/hero.png" alt={`${make} ${model} model`} fill priority className='object-contain rounded' />
                ) : (
                    <p className='text-xl text-emerald-400'>Loading image...</p>
                )}
            </div>

            <div className='relative flex w-full mt-2'>
                <div className='flex group-hover:invisible w-full justify-between text-gray-500'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src="/steering-wheel.svg" width={20} height={20} alt='Transmission type' />
                        <p className='text-[14px]'>{transmission === 'a' ? 'Automatic' : 'Manual'}</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src="/tire.svg" width={20} height={20} alt='Drive type' />
                        <p className='text-[14px]'>{drive.toUpperCase()}</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src="/gas.svg" width={20} height={20} alt='Fuel efficiency' />
                        <p className='text-[14px]'>{city_mpg} MPG</p>
                    </div>
                </div>

                <div className='car-card__btn-container'>
                    <CustomButton 
                        title='View More' 
                        containerStyles="w-full py-[16px] rounded bg-primary-blue"
                        textStyles="text-white text-[14px] leading-[17px] font-bold"
                        rightIcon="/right-arrow.svg"
                        handleClick={() => setIsOpen(true)} 
                    />
                </div>
            </div>

            <CarDetails isOpen={isOpen} closeModel={() => setIsOpen(false)} car={car} />
        </div>
    );
}

export default CarCard;
