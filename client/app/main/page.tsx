"use client";

import { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "@/Components/Navbar";

export default function Home() {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalQuantitySold, setTotalQuantitySold] = useState(0);

    // Fetch data for total products and total sales
    useEffect(() => {
        fetchTotalProducts();
        fetchTotalSales();
    }, []);

    const fetchTotalProducts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/get");
            setTotalProducts(response.data.length); 
        } catch (err) {
            console.log("Error fetching products:", err);
        }
    };

    const fetchTotalSales = async () => {
        try {
            const response = await axios.get("http://localhost:3000/salesOrder/getAll");
            const sales = response.data;

            const totalSalesAmount = sales.reduce((sum, sale) => sum + (sale.sellingPrice * sale.quantitySold), 0);
            const totalQuantity = sales.reduce((sum, sale) => sum + sale.quantitySold, 0);

            setTotalSales(totalSalesAmount);
            setTotalQuantitySold(totalQuantity);
        } catch (err) {
            console.log("Error fetching sales:", err);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen py-20 bg-gray-100 flex flex-col items-center">
                <div className="bg-white shadow-md rounded-lg p-5 w-4/5 mb-10">
                    <div className="flex items-center justify-between gap-1 mb-5 border-b pb-3">
                        <h1 className="text-4xl font-bold text-gray-700">Product Management Dashboard</h1>
                    </div>

                    {/* Metrics Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Total Products */}
                        <div className="bg-blue-500 text-white rounded-lg p-5 shadow-lg">
                            <h2 className="text-2xl font-semibold">Total Products</h2>
                            <p className="text-4xl mt-4">{totalProducts}</p>
                        </div>

                        {/* Total Sales */}
                        <div className="bg-green-500 text-white rounded-lg p-5 shadow-lg">
                            <h2 className="text-2xl font-semibold">Total Sales</h2>
                            <p className="text-4xl mt-4">${totalSales.toFixed(2)}</p>
                        </div>

                        {/* Total Quantity Sold */}
                        <div className="bg-purple-500 text-white rounded-lg p-5 shadow-lg">
                            <h2 className="text-2xl font-semibold">Total Quantity Sold</h2>
                            <p className="text-4xl mt-4">{totalQuantitySold}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
