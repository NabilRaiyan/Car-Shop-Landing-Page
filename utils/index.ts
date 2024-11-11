import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps)
{
    const {manufacturer, fuel, model, year, limit} = filters;

    const headers = {
		'x-rapidapi-key': '3d0b1df596msh84ed7a22c5b945ep1a5875jsnd51486d230c5',
		'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
	}

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&fuel_type=${fuel}&limit=${limit}`, {
        headers: headers
    });

    const result = await response.json();
    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };


//   Pixel: 3N3JM39dEpFtL3hjuCmaC75pbSLVdCoJaCqz0I1z8o98mKottNtt6Rl9

export const generateCarImageURL = async (car: CarProps, angle?: string) => {
    const apiKey = '3N3JM39dEpFtL3hjuCmaC75pbSLVdCoJaCqz0I1z8o98mKottNtt6Rl9';
    const url = new URL('https://api.pexels.com/v1/search?query=mercedes');

    const { make } = car;
    // url.searchParams.append('query', `${make}`); // Search by car make and model

    try {
        const response = await fetch(`${url}`, {
            headers: {
                Authorization: apiKey,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if there are photos in the response and return the first "original" URL
        if (data.photos && data.photos.length > 0) {
            return data.photos[0].src.original;
        }

        // If no photos are found, return null or a placeholder image URL
        return null;

    } catch (error) {
        console.error("Upstream image response failed: ", error);
        return null;
    }

   
};

export const updateSearchParams = (type: string, value: string) => {

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type, value)
    
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    return newPathname;
};

