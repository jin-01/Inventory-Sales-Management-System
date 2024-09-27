"use client";

import React, { useState } from "react";
import axios from 'axios';

const CreateProductPage = () => {
    const [productField, setProductField] = useState({
        pid: "",
        name: "",
        quantity: 0,
        price: 0
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const changeProductFieldHandler = (e) => {
        setProductField({
            ...productField,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/create", productField);
            setSuccessMessage('Product added successfully!');
            setErrorMessage(''); 
            setProductField({ pid: "", name: "", quantity: 0, price: 0 }); 
            console.log(response);
            window.location.href = '/pages/products';
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setErrorMessage(err.response.data.error);
            } else {
                setErrorMessage('Something went wrong. Please try again.');
            }
            setSuccessMessage(''); 
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New Product</h1>

                {/* Display Messages */}
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

                {/* Form */}
                <form onSubmit={onSubmitChange}>
                    <div className="mb-6">
                        <label htmlFor="pid" className="block text-sm font-medium text-gray-700 mb-2">
                            SKU
                        </label>
                        <input
                            type="text"
                            name="pid"
                            id="pid"
                            className="input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter SKU..."
                            value={productField.pid}
                            onChange={changeProductFieldHandler}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Product Name..."
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
                            name="quantity"
                            id="quantity"
                            className="input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Quantity..."
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
                            name="price"
                            id="price"
                            className="input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Price..."
                            value={productField.price}
                            onChange={changeProductFieldHandler}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProductPage;
