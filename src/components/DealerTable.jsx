import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const DealerTable = ({ dealers, filterType, setFilterType }) => {
    const [filterText, setFilterText] = useState('');
    // const [filterType, setFilterType] = useState('all'); // Moved to App.jsx
    const [sortConfig, setSortConfig] = useState({ key: 'state', direction: 'ascending' });
    const navigate = useNavigate();

    // Filter dealers
    const filteredDealers = useMemo(() => {
        return dealers.filter(dealer => {
            const searchStr = filterText.toLowerCase();
            const matchesSearch = (
                dealer.name.toLowerCase().includes(searchStr) ||
                dealer.city.toLowerCase().includes(searchStr) ||
                dealer.state.toLowerCase().includes(searchStr) ||
                dealer.contact.toLowerCase().includes(searchStr)
            );

            if (!matchesSearch) return false;

            if (filterType === 'ai') return dealer.aiDealer;
            if (filterType === 'api') return dealer.apiDealer;

            return true;
        });
    }, [dealers, filterText, filterType]);

    // Sort filtered dealers
    const sortedDealers = useMemo(() => {
        let sortableItems = [...filteredDealers];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredDealers, sortConfig]);

    const handleSortChange = (e) => {
        const value = e.target.value;
        const [key, direction] = value.split('-');
        setSortConfig({ key, direction });
    };

    const goToDetails = (id) => {
        // Navigate using the unique ID
        navigate(`/dealer/${id}`);
    };

    return (
        <div className="space-y-6">
            {/* Controls: Search and Sort */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-4 py-2 text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 focus:bg-white transition-all"
                        placeholder="Search dealers..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                </div>


                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setFilterType('all')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${filterType === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterType('ai')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${filterType === 'ai' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            AI Only
                        </button>
                        <button
                            onClick={() => setFilterType('api')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${filterType === 'api' ? 'bg-yellow-400 text-yellow-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            API Only
                        </button>
                    </div>

                    <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>

                    <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 whitespace-nowrap hidden sm:block">Sort by:</label>
                    <select
                        id="sort-select"
                        className="block w-full md:w-auto pl-3 pr-8 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-lg"
                        onChange={handleSortChange}
                        value={`${sortConfig.key}-${sortConfig.direction}`}
                    >
                        {/* Updated Sort Keys */}
                        <option value="state-ascending">State (A-Z)</option>
                        <option value="state-descending">State (Z-A)</option>
                        <option value="city-ascending">City (A-Z)</option>
                        <option value="city-descending">City (Z-A)</option>
                        <option value="name-ascending">Name (A-Z)</option>
                        <option value="name-descending">Name (Z-A)</option>
                    </select>
                </div>
            </div>

            {/* Grid Layout */}
            <div>
                {sortedDealers.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 className="mt-2 text-base font-medium text-gray-900">No dealers found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedDealers.map((dealer) => (
                            <div key={dealer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col group">
                                <div className="p-5 flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors cursor-pointer"
                                                onClick={() => goToDetails(dealer.id)}
                                                title={dealer.name}>
                                                {dealer.name}
                                            </h3>
                                            <div className="flex gap-1 mt-2">
                                                {dealer.aiDealer && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">
                                                        AI
                                                    </span>
                                                )}
                                                {dealer.apiDealer && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-400 text-yellow-900 uppercase tracking-wider">
                                                        API
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100 whitespace-nowrap ml-2">
                                                {dealer.state}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {/* Location (City) */}
                                        <div className="flex items-start text-sm text-gray-600">
                                            <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            <span>{dealer.city}</span>
                                        </div>
                                        {/* Contact Number */}
                                        <div className="flex items-start text-sm text-gray-600">
                                            <svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                            <span>{dealer.contact}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                                    <button
                                        onClick={() => goToDetails(dealer.id)}
                                        className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors w-full text-center"
                                    >
                                        View Details &rarr;
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="text-center text-sm text-gray-500 mt-4">
                Showing {sortedDealers.length} results
            </div>
        </div>
    );
};

export default DealerTable;
