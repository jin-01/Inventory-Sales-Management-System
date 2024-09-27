"use client";

import React, { useState, useEffect } from "react";
import axios from 'axios';

const CreateSalesOrderPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [quantitySold, setQuantitySold] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/get");
            setProducts(response.data.filter(product => product.quantity > 0));
        } catch (err) {
            console.log("Error fetching products");
        }
    };

    const handleProductChange = (e) => {
        const productId = e.target.value;
        const product = products.find(p => p.pid === productId);
        setSelectedProduct(product);
        setErrorMessage(''); 
    };

    const handleSalesOrderSubmit = async (e) => {
        e.preventDefault();

        if (!selectedProduct) {
            setErrorMessage('Please select a product.');
            setSuccessMessage('');
            return;
        }
        if (sellingPrice <= 0) {
            setErrorMessage('Please enter a valid selling price.');
            setSuccessMessage('');
            return;
        }
        if (quantitySold <= 0 || quantitySold > selectedProduct.quantity) {
            setErrorMessage('Please enter a valid quantity.');
            setSuccessMessage('');
            return;
        }

        try {
            // Create Sales Order
            await axios.post("http://localhost:3000/salesOrder/create", {
                productId: selectedProduct.pid,
                productName: selectedProduct.name,
                quantitySold,
                sellingPrice
            });

            // Update Product Quantity
            await axios.put(`http://localhost:3000/product/updateQuantity/${selectedProduct.pid}`, {
                quantity: selectedProduct.quantity - quantitySold
            });

            setSuccessMessage('Sales order created successfully!');
            setErrorMessage(''); 

            // Reset form fields
            setSelectedProduct(null);
            setSellingPrice(0);
            setQuantitySold(1);
            fetchProducts(); 

            window.location.href = '/pages/sales';
        } catch (err) {
            setErrorMessage('Error creating sales order. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-10">
                <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">Create Sales Order</h1>

                {errorMessage && (
                    <div className="mb-4 p-4 text-center bg-red-200 text-red-800 border border-red-400 rounded-lg shadow-md">
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div className="mb-4 p-4 text-center bg-green-200 text-green-800 border border-green-400 rounded-lg shadow-md">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSalesOrderSubmit}>
                    <div className="mb-8">
                        <label htmlFor="product" className="block text-lg font-medium text-gray-700 mb-2">
                            Select Product
                        </label>
                        <select
                            name="product"
                            id="product"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            onChange={handleProductChange}
                            value={selectedProduct ? selectedProduct.pid : ''}
                        >
                            <option value="">Select a product</option>
                            {products.map(product => (
                                <option key={product.pid} value={product.pid}>
                                    {product.name} (Available: {product.quantity})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-8">
                        <label htmlFor="sellingPrice" className="block text-lg font-medium text-gray-700 mb-2">
                            Selling Price
                        </label>
                        <input
                            type="number"
                            name="sellingPrice"
                            id="sellingPrice"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            placeholder="Selling Price..."
                            value={sellingPrice}
                            onChange={e => setSellingPrice(parseFloat(e.target.value))}
                            required
                        />
                    </div>

                    <div className="mb-8">
                        <label htmlFor="quantitySold" className="block text-lg font-medium text-gray-700 mb-2">
                            Quantity Sold
                        </label>
                        <input
                            type="number"
                            name="quantitySold"
                            id="quantitySold"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            placeholder="Quantity..."
                            min="1"
                            max={selectedProduct ? selectedProduct.quantity : 0}
                            value={quantitySold}
                            onChange={e => setQuantitySold(parseInt(e.target.value, 10))}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg rounded-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-lg"
                    >
                        Create Sales Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateSalesOrderPage;
