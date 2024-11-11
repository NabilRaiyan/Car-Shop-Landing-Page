"use client";

import { CarProps } from '@/types';
import React from 'react'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { generateCarImageURL } from '@/utils';


interface CarDetailsProps{
    isOpen: boolean,
    closeModel: () => void;
    car: CarProps;
}




const CarDetails = ({isOpen, closeModel, car} : CarDetailsProps) => {
    const [carImageURL, setCarImageURL] = useState<string | null>(null);

    useEffect(() => {
        const fetchImageURL = async () => {
            const url = await generateCarImageURL(car);
            setCarImageURL(url);
        };
    
        fetchImageURL();
    }, [car]);


  return (
    <>
    <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className="relative z-10" onClose={closeModel}>
                <TransitionChild as={Fragment} enter='ease-out duration-300'
                                    enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200'
                                    leaveFrom='opacity-100' leaveTo='opacity-0'>
                    <div className='fixed inset-0 bg-black bg-opacity-25'></div>
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <TransitionChild as={Fragment} enter='ease-out duration-300'
                                    enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200'
                                    leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>

                                <DialogPanel className="relative max-w-lg max-h-[90vh] w-full overflow-y-auto transform rounded-2xl
                                                            bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                                    <button type='button' onClick={closeModel} className='absolute rounded-full top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100'>
                                        <Image src='/close.svg' alt='close dialog' 
                                                width={20} height={20} className='object-contain' />
                                    </button>
                                    <div className='flex flex-1 gap-3 flex-col'>
                                        <div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded'>
                                        {carImageURL ? (
                                                <Image src='/hero.png' alt={`${car.make} ${car.model} model`} fill priority className='object-contain' />
                                            ) : (
                                                <p className='text-xl text-emerald-400'>Loading image...</p>
                                            )}
                                        </div>

                                        <div className='flex gap-3'>
                                            <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                                            {carImageURL ? (
                                                <Image src={carImageURL} alt={`${car.make} ${car.model} model`} fill priority className='object-contain' />
                                            ) : (
                                                <p className='text-xl text-emerald-400'>Loading image...</p>
                                            )}
                                            </div>
                                            <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                                            {carImageURL ? (
                                                <Image src={carImageURL} alt={`${car.make} ${car.model} model`} fill priority className='object-contain' />
                                            ) : (
                                                <p className='text-xl text-emerald-400'>Loading image...</p>
                                            )}
                                            </div>
                                            <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                                            {carImageURL ? (
                                                <Image src={carImageURL} alt={`${car.make} ${car.model} model`} fill priority className='object-contain' />
                                            ) : (
                                                <p className='text-xl text-emerald-400'>Loading image...</p>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                    {/* car details */}
                                    <div className='flex-1 flex flex-col gap-2'>
                                        <h2 className='font-semibold text-xl capitalize'>
                                            {car.make} {car.model}
                                        </h2>

                                        <div className='mt-3 flex flex-wrap gap-4'>
                                            {/* returning key and value of car object */}
                                            {Object.entries(car).map(([key, value]) => (
                                                <div className='flex justify-between gap-5 w-full text-right' key={key}>
                                                    <h4 className='text-gray-400 capitalize'>{key.split("_").join(" ")}</h4>
                                                    <p className='text-black-100 font-semibold'>{value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                    </div>
                </div>
            </Dialog>
    </Transition>
    </>
  )
}

export default CarDetails
