import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Papa from 'papaparse';
import DealerTable from './components/DealerTable';
import DealerDetails from './components/DealerDetails';
import StateStats from './components/StateStats';

function App() {
    const [dealers, setDealers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all'); // 'all', 'ai', 'api'

    // Compute filtered dealers for StateStats
    const filteredForStats = dealers.filter(dealer => {
        if (filterType === 'ai') return dealer.aiDealer;
        if (filterType === 'api') return dealer.apiDealer;
        return true;
    });

    useEffect(() => {
        const fetchDealers = async () => {
            try {
                const response = await fetch('/dealers.csv');
                const reader = response.body.getReader();
                const result = await reader.read();
                const decoder = new TextDecoder('utf-8');
                const csv = decoder.decode(result.value);

                Papa.parse(csv, {
                    header: true,
                    complete: (results) => {
                        // Map raw CSV columns to standardized keys
                        const validData = results.data
                            .filter(row => row['Dealer Name'] && row['State/Country'])
                            .map(row => ({
                                id: row['S. No.'],
                                name: row['Dealer Name'],
                                address: row['Dealer Address'],
                                city: row['Location'],
                                state: row['State/Country'], // Mapping State/Country to state
                                contact: row['Contact Number'],
                                contactPerson: row['Contact Person'],
                                aiDealer: row['AI Dealer'] === 'TRUE',
                                apiDealer: row['API Dealer'] === 'TRUE'
                            }));

                        setDealers(validData);
                        setLoading(false);
                    },
                    error: (error) => {
                        console.error('Error parsing CSV:', error);
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.error('Error fetching CSV:', error);
                setLoading(false);
            }
        };

        fetchDealers();
    }, []);

    return (
        <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <header className="bg-white shadow-sm z-10 sticky top-0">
                    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="text-red-600">Autoways</span> Dealer Locator
                        </h1>
                    </div>
                </header>

                <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                        </div>
                    ) : (
                        <Routes>
                            <Route path="/" element={
                                <div className="w-full">
                                    {/* State Coverage Dashboard */}
                                    <StateStats dealers={filteredForStats} />

                                    <div className="mb-6">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Authorized Dealers</h2>
                                        <p className="text-gray-600">Find an Autoways dealer near you. Search by city, state, or dealer name.</p>
                                    </div>
                                    <DealerTable
                                        dealers={dealers}
                                        filterType={filterType}
                                        setFilterType={setFilterType}
                                    />
                                </div>
                            } />
                            {/* Switching routing to use 'id' instead of name for robustness */}
                            <Route path="/dealer/:id" element={<DealerDetails dealers={dealers} />} />
                        </Routes>
                    )}
                </main>
            </div>
        </Router>
    );
}

export default App;
