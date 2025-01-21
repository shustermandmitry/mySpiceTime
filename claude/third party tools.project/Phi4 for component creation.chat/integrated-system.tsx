import React, {useState} from 'react';

const IntegratedSystemDemo = () => {
    const [activeFlow, setActiveFlow] = useState(null);

    const metrics = [
        {id: 'access', name: 'Access Rate', value: 92.5, trend: 3.2},
        {id: 'satisfaction', name: 'Satisfaction', value: 4.2, trend: 0.5},
        {id: 'efficiency', name: 'Efficiency', value: 87, trend: -1.2}
    ];

    return (
        <div className="p-8 bg-gray-100 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Community Health System</h2>

            {/* Domain Visualization */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <div className="grid grid-cols-3 gap-6">
                    {['Healthcare', 'Wellness', 'Support'].map(domain => (
                        <div
                            key={domain}
                            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                            onMouseEnter={() => setActiveFlow(domain)}
                            onMouseLeave={() => setActiveFlow(null)}
                        >
                            <h3 className="font-semibold text-lg mb-2">{domain}</h3>
                            <div className="h-2 bg-blue-100 rounded">
                                <div
                                    className="h-full bg-blue-500 rounded"
                                    style={{width: `${Math.random() * 60 + 40}%`}}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Resource Flows */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="font-semibold mb-4">Resource Allocation</h3>
                <div className="space-y-4">
                    {['Healthcare', 'Wellness', 'Support'].map(domain => (
                        <div
                            key={domain}
                            className="flex items-center space-x-4"
                        >
                            <div className="w-24 text-sm">{domain}</div>
                            <div className="flex-1 h-2 bg-gray-100 rounded">
                                <div
                                    className={`h-full rounded transition-all duration-500 ${
                                        activeFlow === domain ? 'bg-blue-500' : 'bg-blue-300'
                                    }`}
                                    style={{width: `${Math.random() * 60 + 40}%`}}
                                />
                            </div>
                            <div className="w-16 text-sm text-gray-600">
                                {Math.floor(Math.random() * 100)}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-3 gap-6">
                {metrics.map(metric => (
                    <div
                        key={metric.id}
                        className="bg-white p-4 rounded-lg shadow-lg"
                    >
                        <div className="text-sm text-gray-600 mb-1">{metric.name}</div>
                        <div className="text-2xl font-bold mb-2">
                            {metric.value}
                            {metric.id === 'satisfaction' ? '/5' : '%'}
                        </div>
                        <div className={`text-sm ${
                            metric.trend > 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                            {metric.trend > 0 ? '↑' : '↓'} {Math.abs(metric.trend)}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IntegratedSystemDemo;