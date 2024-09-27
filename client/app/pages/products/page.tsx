"use client";

import React, { useEffect, useState } from "react";
import axios from 'axios';
import Link from "next/link";
import Navbar from "@/Components/Navbar";

export default function Products() {
    const [productData, setProductData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    
    const [sortConfig, setSortConfig] = useState({ key: 'pid', direction: 'asc' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get("http://localhost:3000/get");
            setProductData(result.data);

            handleSort(sortConfig.key, result.data);
        } catch (err) {
            console.log("Something went wrong");
        }
    };

    const handleDelete = async (pid) => {
        await axios.delete(`http://localhost:3000/delete/${pid}`);
        const newProductData = productData.filter((item) => item.pid !== pid);
        setProductData(newProductData);
        setFilteredData(newProductData);
    };

    const handleSort = (key, dataToSort = null) => {
        let direction = 'asc';
    
        if (!dataToSort) {
            if (sortConfig.key === key && sortConfig.direction === 'asc') {
                direction = 'desc';
            }
        } else {
        
            direction = sortConfig.direction;
        }
    
        setSortConfig({ key, direction });
    
        // Sort the data
        const sortedData = [...(dataToSort || filteredData)].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    
        setFilteredData(sortedData);
    };
    
    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const applyFilters = () => {
        let filtered = [...productData];

        if (filters.minPrice !== '') {
            filtered = filtered.filter(product => product.price >= parseFloat(filters.minPrice));
        }

        if (filters.maxPrice !== '') {
            filtered = filtered.filter(product => product.price <= parseFloat(filters.maxPrice));
        }

        if (filters.minQuantity !== '') {
            filtered = filtered.filter(product => product.quantity >= parseInt(filters.minQuantity, 10));
        }

        // Apply sorting to filtered data
        handleSort(sortConfig.key, filtered);
    };

    // Initialize filters state
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        minQuantity: ''
    });

    return (
    <div>
        <Navbar/>
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Product Management</h1>

            <div className="mb-4 text-right">
                <Link href="/product/create" className="btn btn-primary mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    Add Product
                </Link>
                <Link href="/product/upload" className="btn btn-primary bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
                    Upload Text File
                </Link>
            </div>

            {/* Filter Inputs */}
            <div className="flex flex-wrap gap-4 mb-6 justify-center items-end">
                <div>
                    <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">Min Price</label>
                    <input
                        type="number"
                        name="minPrice"
                        id="minPrice"
                        className="input input-bordered input-primary w-48 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                    />
                </div>
                <div>
                    <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">Max Price</label>
                    <input
                        type="number"
                        name="maxPrice"
                        id="maxPrice"
                        className="input input-bordered input-primary w-48 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                    />
                </div>
                <div>
                    <label htmlFor="minQuantity" className="block text-sm font-medium text-gray-700">Min Quantity</label>
                    <input
                        type="number"
                        name="minQuantity"
                        id="minQuantity"
                        className="input input-bordered input-primary w-48 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters.minQuantity}
                        onChange={handleFilterChange}
                    />
                </div>
                <button
                    onClick={applyFilters}
                    className="btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-48"
                >
                    Apply Filters
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-300 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="py-3 px-6 text-left">#</th>
                            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('pid')}>
                                SKU {sortConfig.key === 'pid' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '▲'}
                            </th>
                            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('name')}>
                                Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '▲'}
                            </th>
                            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('quantity')}>
                                Quantity {sortConfig.key === 'quantity' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '▲'}
                            </th>
                            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('price')}>
                                Price {sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '▲'}
                            </th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((product, index) => (
                            <tr key={product.pid} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-6">{index + 1}</td>
                                <td className="py-3 px-6">{product.pid}</td>
                                <td className="py-3 px-6">{product.name}</td>
                                <td className="py-3 px-6">{product.quantity}</td>
                                <td className="py-3 px-6">{product.price}</td>
                                <td className="flex justify-center gap-2 py-3">
                                    <Link href={`/product/edit/${product.pid}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(product.pid)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}
