"use client";

import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link';
import Navbar from "@/Components/Navbar";

const SalesRecordsPage = () => {
    const [salesRecords, setSalesRecords] = useState([]);

    useEffect(() => {
        fetchSalesRecords();
    }, []);

    const fetchSalesRecords = async () => {
        try {
            const response = await axios.get("http://localhost:3000/salesOrder/getAll");
            setSalesRecords(response.data);
        } catch (err) {
            console.log("Error fetching sales records");
        }
    };

    return (
    <div>
        <Navbar/>
        <div className="max-w-4xl mx-auto mt-5">
            <h1 className="text-2xl text-center mb-4">Sales Records</h1>
            <div className="mb-4 text-right">
                <Link href="/sales/create" className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    Create Sales
                </Link>
            </div>

            {/* Sales Records Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-300 text-gray-700 uppercase text-sm">
                        <tr>
                            <th className="py-3 px-6 text-left">SKU</th>
                            <th className="py-3 px-6 text-left">Product Name</th>
                            <th className="py-3 px-6 text-left">Quantity Sold</th>
                            <th className="py-3 px-6 text-left">Selling Price</th>
                            <th className="py-3 px-6 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesRecords.map((record, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-6">{record.productId}</td>
                                <td className="py-3 px-6">{record.productName}</td>
                                <td className="py-3 px-6">{record.quantitySold}</td>
                                <td className="py-3 px-6">${record.sellingPrice}</td>
                                <td className="py-3 px-6">{new Date(record.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
};

export default SalesRecordsPage;
