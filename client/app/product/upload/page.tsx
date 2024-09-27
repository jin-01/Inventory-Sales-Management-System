"use client";

import React, { useState } from "react";
import axios from 'axios';

const CreateProductPage = () => {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type === 'text/plain') {
            setFile(selectedFile);
            setErrorMessage(''); 
        } else {
            setFile(null);
            setErrorMessage('Please select a valid .txt file.');
        }
    };

    // Handle file upload and processing
    const onSubmitFile = async (e) => {
        e.preventDefault();
        if (!file) {
            setErrorMessage('No valid file selected.');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await axios.post("http://localhost:3000/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccessMessage(response.data.message);
            setErrorMessage(''); 
            setFile(null); 
            window.location.href = '/pages/products';
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setErrorMessage(`Upload failed: ${err.response.data.error}`);
            } else {
                setErrorMessage('Something went wrong. Please try again.');
            }
            setSuccessMessage(''); 
        }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Upload Product File</h1>

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

                <form onSubmit={onSubmitFile}>
                    <div className="mb-6">
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                            Select Text File
                        </label>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            accept=".txt"
                            onChange={handleFileChange}
                            className="input input-bordered w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Upload File
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProductPage;
