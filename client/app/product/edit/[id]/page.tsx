"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useParams } from 'next/navigation';

export default function EditProductPage() {
    const { id: pid } = useParams(); 
    const [productField, setProductField] = useState({
        pid: "",
        name: "",
        quantity: 0,
        price: 0
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchProduct();
    }, [pid]);

    const fetchProduct = async () => {
        try {
            const result = await axios.get(`http://localhost:3000/get/${pid}`);
            setProductField(result.data);
        } catch (err) {
            setErrorMessage('Failed to fetch product details. Please try again.');
        }
    };

    const changeProductFieldHandler = (e) => {
        setProductField({
            ...productField,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/update/${pid}`, productField);
            setSuccessMessage('Product updated successfully!');
            setErrorMessage('');
            window.location.href = '/pages/products';
        } catch (err) {
            setErrorMessage('Something went wrong while updating the product. Please try again.');
            setSuccessMessage(''); 
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Edit Product</h1>

                {errorMessage && (
                    <div className="mb-4 p-3 text-center bg-red-100 text-red-700 border border-red-400 rounded">
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div className="mb-4 p-3 text-center bg-green-100 text-green-700 border border-green-400 rounded">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={onSubmitChange}>
                    <div className="mb-6">
                        <label htmlFor="pid" className="block text-sm font-medium text-gray-700 mb-2">
                            SKU
                        </label>
                        <input 
                            type="text" 
                            id="pid" 
                            name="pid" 
                            className="input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={productField.pid} 
                            disabled 
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Product Name"
                            value={productField.name}
                            onChange={changeProductFieldHandler}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            className="input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Quantity"
                            value={productField.quantity}
                            onChange={changeProductFieldHandler}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Price"
                            value={productField.price}
                            onChange={changeProductFieldHandler}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}
