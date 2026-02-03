import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gemHarnessLogo } from "../../public/GEM_HARNESS.png"
import { gemPowerLogo } from "../../public/GEM_PWER.png"
import { hktLogo } from "../../public/HKT.png"
import { galeriaLogo } from "../../public/GALERIA_LOGO.jpeg"

const DealerDetails = ({ dealers }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find dealer by ID (normalized key)
    // Ensure we compare strings/numbers correctly (CSV IDs might be strings)
    const dealer = dealers.find(d => String(d.id) === String(id));

    if (!dealer) {
        return (
            <div className="flex flex-col items-center justify-center h-full py-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Dealer Not Found</h2>
                <p className="text-gray-600 mb-6">We couldn't find the dealer you're looking for.</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Back to List
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => navigate('/')}
                className="mb-6 flex items-center text-gray-600 hover:text-red-600 transition-colors"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to Dealers
            </button>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-800 px-8 py-10 text-white">
                    <h1 className="text-3xl font-bold mb-2">{dealer.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-red-100 mt-2">
                        <span className="bg-red-500/30 px-3 py-1 rounded-full text-sm font-medium border border-red-400/30">
                            Authorized Dealer
                        </span>
                        {dealer.aiDealer && (
                            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium border border-blue-400/30 shadow-sm">
                                AI Dealer
                            </span>
                        )}
                        {dealer.apiDealer && (
                            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium border border-yellow-300 shadow-sm">
                                API Dealer
                            </span>
                        )}
                    </div>
                    <div className="mt-4 text-red-50 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>{dealer.city}, {dealer.state}</span>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Dealer Information</h3>
                        <div className="space-y-6">

                            {/* Address */}
                            <div className="flex items-start">
                                <div className="bg-red-50 p-2 rounded-lg mr-4 text-red-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-500">Address</span>
                                    <span className="text-gray-900 leading-relaxed block mt-1">
                                        {dealer.address || 'Address not available'}
                                    </span>
                                </div>
                            </div>

                            {/* Contact Person */}
                            {dealer.contactPerson && (
                                <div className="flex items-start">
                                    <div className="bg-red-50 p-2 rounded-lg mr-4 text-red-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-medium text-gray-500">Contact Person</span>
                                        <span className="text-gray-900 block mt-1">{dealer.contactPerson}</span>
                                    </div>
                                </div>
                            )}

                            {/* Phone */}
                            <div className="flex items-start">
                                <div className="bg-red-50 p-2 rounded-lg mr-4 text-red-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-500">Contact Number</span>
                                    <span className="text-gray-900 block mt-1 font-mono">{dealer.contact}</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 h-fit">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Deals In</h3>
                        <div className="space-y-4">
                            {dealer.aiDealer && (
                                <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-wrap gap-4 items-center justify-center">
                                    <img src={hktLogo} alt="HKT" className="h-10 object-contain" />
                                    <div className="h-8 w-px bg-gray-200"></div>
                                    <img src={gemPowerLogo} alt="GEM POWER" className="h-10 object-contain" />
                                    <div className="h-8 w-px bg-gray-200"></div>
                                    <img src={gemHarnessLogo} alt="GEM HARNESS" className="h-10 object-contain" />
                                </div>
                            )}

                            {dealer.apiDealer && (
                                <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm flex justify-center">
                                    <img
                                        src={galeriaLogo}
                                        alt="Galeria API Dealer"
                                        className="max-h-16 object-contain"
                                    />
                                </div>
                            )}

                            {!dealer.aiDealer && !dealer.apiDealer && (
                                <p className="text-gray-500 italic">No specific deal information available.</p>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealerDetails;
