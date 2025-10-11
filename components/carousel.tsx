"use client";

import { Card, CardContent, CardTitle } from "./ui/card";
import Stripe from "stripe";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props{
    products: Stripe.Product[];
}

export const Carousel = ({products = []}: Props) => {
    //const products = props.products || []; // fallback to empty array


    const[current, setCurrent] = useState<number>(0); //References the current index of products array
    
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length); // Allows carousel to wrap around to the beginning
        }, 3000);

        return () => clearInterval(interval);
    }, [products.length]);
    
    const currentProduct = products[current];

    const price = currentProduct.default_price as Stripe.Price;

    return (
    <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
        {currentProduct.images && currentProduct.images[0] && (
            <div className="relative h-80 w-full">
                <Image 
                    src={currentProduct.images[0]} 
                    alt={currentProduct.name} 
                    layout="fill" 
                    objectFit="cover"
                    className="transition-opacity dureation-500 ease-in-out"
                />
            </div>
        )}
            <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-black">
                <CardTitle className="text-3xl font-bold text-white mb-2">
                    {currentProduct.name}
                </CardTitle>
                {price && price.unit_amount && (
                    <p className="text-xl text-white">
                        ${(price.unit_amount / 100).toFixed(2)}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};