import React, { useMemo } from 'react';

const INDIAN_STATES_AND_UTS = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Delhi", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const StateStats = ({ dealers }) => {
    const stats = useMemo(() => {
        const counts = {};
        dealers.forEach(dealer => {
            // Data is now normalized to lowercase 'state'
            const state = dealer.state;
            if (state) {
                counts[state] = (counts[state] || 0) + 1;
            }
        });
        return counts;
    }, [dealers]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Dealer Coverage by State</h2>
            <div className="flex flex-wrap gap-2">
                {INDIAN_STATES_AND_UTS.map(state => {
                    const count = stats[state] || 0;
                    const hasDealers = count > 0;

                    return (
                        <div
                            key={state}
                            className={`relative group px-3 py-1.5 object-contain rounded-full text-xs font-medium border transition-colors cursor-default
                ${hasDealers
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                                }`}
                        >
                            <div className="flex items-center gap-1.5">
                                <span>{state}</span>
                                {hasDealers ? (
                                    <span className="bg-green-200 text-green-800 px-1.5 rounded-full text-[10px] min-w-[1.25rem] text-center">
                                        {count}
                                    </span>
                                ) : (
                                    <span className="text-red-400">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                        </svg>
                                    </span>
                                )}
                            </div>

                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                {hasDealers ? `${count} Active Dealer${count !== 1 ? 's' : ''}` : 'No Authorized Dealers - Potential Market'}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 flex gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-50 border border-green-200"></div>
                    <span>Active Market</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-50 border border-red-200"></div>
                    <span>Potential Market</span>
                </div>
            </div>
        </div>
    );
};

export default StateStats;
