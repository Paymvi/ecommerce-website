"use client"

import Stripe from "stripe"
import { ProductCard } from "./product-card";
import { useState } from "react";

interface Props {
    products: Stripe.Product[];
}

export const ProductList = ({products} : Props) =>{
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredProduct = products.filter((product) => {
        const term = searchTerm.toLowerCase(); //Normalizes letters, i.e. all letters = same casing
        const nameMatch = product.name.toLowerCase().includes(term); //Normalizes product name
        const descriptionMatch = product.description //Checks if the user input matches product description
            ? product.description.toLowerCase().includes(term)
            : false;

            return nameMatch || descriptionMatch; //Return if name match/description match = true
    });

    return (
        <div>
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProduct.map((product, key) => (
                <li key={key}>
                    <ProductCard product={product} />
                </li>
                ))}
            </ul>
        </div>
    );
}